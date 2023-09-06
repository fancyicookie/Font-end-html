const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// console.log(ctx);

// 设置拖拽状态：拖拽开始，拖拽中，拖拽结束即闲置状态
const statusConfig = {
    IDLE: 0,
    DRAG_START: 1,
    DRAGGING: 2,
    // 画布移动状态
    MOVE_START: 3,
    MOVING: 4
}
const canvasInfo = {
    status: statusConfig.IDLE,
    // 拖拽对象
    dragTarget: null,
    // 记录坐标，确定真的是拖动动作，而不仅仅是点击状态
    lastEvtPos: { x: null, y: null },
    // 偏移量
    offsetEvtPos: { x: null, y: null },
    offset: { x: 0, y: 0 },
    scale: 1,
    scaleStep: 0.1,
    maxScale: 2,
    minScale: 0.5
}

// 圆的信息
const circles = []

const drawCircle = (ctx, cx, cy, r) => {
    ctx.save()
    ctx.beginPath()

    ctx.strokeStyle = 'orange'
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()

    ctx.closePath()
    ctx.restore()
}

// ctx.translate(100, 0)

drawCircle(ctx, 100, 100, 20)
circles.push({
    x: 100,
    y: 100,
    r: 20
})

drawCircle(ctx, 200, 200, 10)
circles.push({
    x: 200,
    y: 200,
    r: 10
})


// 画布位置
const getCanvasPosition = (e, offset= {x: 0, y: 0}, scale = 1) => {
    return {
        x: (e.offsetX - offset.x) / scale,
        y: (e.offsetY - offset.y) / scale
    }
}

// 计算距离
const getDistance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) **2)
}

// 判断是否在圆内
const ifInCircle = (pos) => {
    for(let i=0; i<circles.length; i++) {
        if(getDistance(circles[i], pos) < circles[i].r) {
            return circles[i]
        }
    }
    return false
}

canvas.oncontextmenu = function() {
    return false
}

canvas.addEventListener('mousedown', e => {
    // console.log(getCanvasPosition(e));
    // 计算了偏移和放缩之后的位置
    const canvasPosition = getCanvasPosition(e, canvasInfo.offset, canvasInfo.scale)
    const circleRef = ifInCircle(canvasPosition)
    // 左键拖动元素，右键拖动画布
    if (e.button === 0) {
        if (circleRef) {
            canvasInfo.dragTarget = circleRef
            canvasInfo.status = statusConfig.DRAG_START
            canvasInfo.lastEvtPos = canvasPosition
            canvasInfo.offsetEvtPos = canvasPosition
        }
    } else if (e.button === 2) {
        // 避开在圆上拖动画布
        if (!circleRef) {
            console.log('right');
            canvasInfo.status = statusConfig.MOVE_START
            canvasInfo.lastEvtPos = canvasPosition
            canvasInfo.offsetEvtPos = canvasPosition
        }
    }
})

canvas.addEventListener('mousemove', e => {
    const canvasPosition = getCanvasPosition(e, canvasInfo.offset, canvasInfo.scale)
    if (ifInCircle(canvasPosition)) {
        canvas.style.cursor = 'grab'
    } else {
        canvas.style.cursor = ''
    }
    // 距离阈值,代表真的想拖动的状态
    if (canvasInfo.status === statusConfig.DRAG_START && getDistance(canvasPosition, canvasInfo.lastEvtPos) > 5) {
        // console.log('try to drag');
        canvasInfo.status = statusConfig.DRAGGING
        canvasInfo.offsetEvtPos = canvasPosition
    } else if (canvasInfo.status === statusConfig.DRAGGING) {
        // console.log('dragging');
        const { dragTarget } = canvasInfo
        dragTarget.x += canvasPosition.x - canvasInfo.offsetEvtPos.x
        dragTarget.y += canvasPosition.y - canvasInfo.offsetEvtPos.y
        // 拖动修改位置坐标，即对圆进行重新绘制
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        circles.forEach(c => drawCircle(ctx, c.x, c.y, c.r))
        // console.log(dragTarget);
        canvasInfo.offsetEvtPos = canvasPosition
    } else if (canvasInfo.status === statusConfig.MOVE_START && getDistance(canvasPosition, canvasInfo.lastEvtPos) > 5) {
        canvasInfo.status = statusConfig.MOVING
        canvasInfo.offsetEvtPos = canvasPosition
    } else if (canvasInfo.status === statusConfig.MOVING) {
        console.log('moving');
        canvasInfo.offset.x += canvasPosition.x - canvasInfo.offsetEvtPos.x
    }
})

// 鼠标抬起的时候不能算拖动状态
canvas.addEventListener('mouseup', e => {
    if (canvasInfo.status === statusConfig.DRAGGING || canvasInfo.status === statusConfig.MOVING) {
        canvasInfo.status = statusConfig.IDLE
    }
})

// 鼠标滚动操作
canvas.addEventListener('wheel', e => {
    e.preventDefault()
    const canvasPosition = getCanvasPosition(e, canvasInfo.offset)
    const { scaleStep, maxScale, minScale } = canvasInfo
    const deltaX = canvasPosition.x / canvasInfo.scale * canvasInfo.scaleStep
    const deltaY = canvasPosition.y / canvasInfo.scale * canvasInfo.scaleStep

    // wheelDelta属性
    if (e.wheelDelta > 0 && canvasInfo.scale < canvasInfo.maxScale) {
        console.log('up');
        canvasInfo.offset.x -= deltaX
        canvasInfo.offset.y -= deltaY
        canvasInfo.scale += scaleStep
    } else if (e.wheelDelta <= 0 && canvasInfo.scale > canvasInfo.minScale) {
        console.log('down');
        canvasInfo.offset.x += deltaX
        canvasInfo.offset.y += deltaY
        canvasInfo.scale -= scaleStep
    }
    // 缩放
    ctx.setTransform(canvasInfo.scale, 0, 0, canvasInfo.scale, canvasInfo.offset.x, canvasInfo.offset.y)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    circles.forEach(c => drawCircle(ctx, c.x, c.y, c.r))
})