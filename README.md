# Font-end-html

#### 1. The part is so easy that you can get it quickly

#### 2. I want to open some repositories that may help some others

#### 3. Please correct me if there are any mistakes. Thank you !!!

### Main Content：

+ 标题标签 `h`

+ 段落标签 `p`

+ 文本格式标签

  ```html
  <b>加粗</b>  
  <u>下划线</u>
  <i>倾斜</i>
  <s>删除线</s>
  
  <strong>加粗</strong>
  <ins>下划线</ins>
  <em>倾斜</em>
  <del>删除线</del>

+ 图片标签

  ```html
  <img src="./source/girl.jpeg" alt="girl" title="图片名称" width="300">

+ 音频标签

  ```html
  <audio src="./source/music.mp3" controls="" loop=""></audio>

+ 视频标签

  ```html
  <video src="./source/video.mp4" controls="" autoplay="" muted=""></video>

+ 链接标签 `a`

+ 列表

  ```html
  1. 无序列表
  <ul>
      <li>榴莲</li>
      <li>香蕉</li>
      <li>苹果</li>
  </ul>
  
  2. 有序列表
  <ol>
      <li>张三: 100</li>
      <li>李四: 90</li>
      <li>王二: 80</li>
  </ol>
  
  3. 自定义列表
  <dl>
      <dt>帮助中心</dt>
      <dd>账户管理</dd>
      <dd>购物指南</dd>
  </dl>

+ 表格标签

  ```html
  	<table border="1" width="300" height="200"> 
     	 	<caption><b>学生成绩单</b></caption>
  		<thead>
              <tr>
                  <th>姓名</th>
                  <th>成绩</th>
                  <th>评语</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>小哥哥</td>
                  <td>100</td>
                  <td>优秀</td>
              </tr>
              <tr>
                  <td>小姐姐</td>
                  <td>100</td>
                  <td>优秀</td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td>总结</td>
                  <td>100</td>
                  <td>优秀优秀</td>
              </tr>
          </tfoot>
  	</table>
  合并单元格：<!-- 跨行合并（rowspan）跨列合并（colspan） -->

+ 表单

  ```
  <!-- input标签可以通过type属性值的不同，展示不同的效果 -->
      <!-- type属性名 -->
          <!-- text 文本框写什么显示什么-->         
          <!-- password 密码框输入变成加密-->
          <!-- radio 单选框，用于多选一  -->
          <!-- checkbox 多选框，用于多选多-->
          <!-- file 文件选择，用于上传文件-->
  
          <!-- submit 提交按钮-->
          <!-- reset 重置按钮，用于重置-->
          <!-- button 普通按钮，默认无功能，之后配合js添加功能-->
      
      <!-- label标签: 常用于绑定内容与表单标签的关系
      使用方法一:
          使用label标签把内容包裹起来
          在表单标签加上id属性
          在label标签的for属性中设置对应的id属性值 -->
  ```

+ 没有语义标签 `div` `span`

+ 语义化标签

  ```
  <!-- 在html5中新推出了一些有语义的标签 -->
      <!-- 显示的特点和div一致,但是比div多了不同的语义 -->
  
      <!-- 手机端尝试用的标签 -->
      <!-- 
      header 网页头部
      nav 网页导航
      footer 网页底部
      aside 网页侧边栏
      section 网页区块
      article 网页文章 
  -->
