$(document).ready(function(){
	var Final_money,Money;
	/*tab切换，主要实现border的变化*/
	$("#sinopec").click(function(){
		$("#sinopec>div").addClass('tab_active');
		$("#petrochina>div").removeClass('tab_active');
		window.location.reload();//刷新当前页面
	});
	$("#petrochina").click(function(){
		$("#petrochina>div").addClass('tab_active');
		$("#sinopec>div").removeClass('tab_active');
 		Final_money="";
		Money="";
		var start_val='充值';
		$("#gas_btn2").html(start_val);
	});
		/*充值价位的选择*/
	var As=$(".weui-no-gutter a");
	var Aspan=$(".weui-no-gutter a span");
	var Btn1=$("#gas_btn1");
	var Btn2=$("#gas_btn2");
	var Btn3=$("#gas_btn3");
	As.click(function(){  //添加此行
		$(this).addClass('active').siblings().removeClass("active");  //添加此行
	});
	
	As.each(function(index){
	  $(this).click(function(){
	  	console.log(index);
		  Money=$(this).find(Aspan.eq(index)).html();
		  Final_money=Money*0.92;
		  var Con='确认充值￥'+Final_money+'元';
		  Btn1.html(Con);
		  Btn2.html(Con);
		 });	  
	});
	 var card_num;
	 //弹出对话框
	 $(Btn1).click(function(){
	 	card_num=$("#num_input1").val();
		if(card_num ==""){
	 		$.alert("加油卡卡号不能为空！");
	 	}else if(card_num.length!=19){
	 		$.alert("加油卡卡号只能为19位！");
	 	}else if(typeof(Money)=="undefined"){
	 		$.alert("请选择充值金额！");
	 	}else{
	 		gas_sub(card_num,'中石化');
	 		card_num="";
	 	}
	 });
	 $(Btn2).click(function(){
	 	card_num=$("#num_input2").val();
	 	if(card_num ==""){
	 		$.alert("加油卡卡号不能为空！");
	 	}else if(card_num.length!=16){
	 		$.alert("加油卡卡号只能为16位");
	 	}else if(Money==""){
	 		$.alert("请选择充值金额！");
	 	}else{
	 		gas_sub(card_num,'中石油');
	 		card_num="";
	 	}
	 });
	 /*二次充值的弹出框*/
	$(Btn3).click(function(){
	 	if(typeof(Money)=="undefined"){
	 		$.alert("请选择充值金额！");
	 	}else{
	 		gas_sub('1234567890123456789','中石化');
	 	}
	 });
	 function gas_sub(card_num,text){
	 	var content='<ul class="dialog_ul"><li>加油卡号<span class="span_gray">'+card_num+'</span></li>'
	 	+'<li>充值类型<span class="span_gray">'+text+'加油卡</span></li><li>充值金额<span class="span_red">￥'+Money+'</span></li><li>实付金额<span class="span_red">'+Final_money+'</span></li></ul>';
	 	$.modal({
  			title: '订单确认',
  			text: content,
 			 buttons: [
    		{ text: "取消", onClick: function(){ 
    			
    		}},
    		{ text: "确定", onClick: function(){
    			$.toast("请稍后...");/*暂时，以后做跳转*/
    		}}
  			]
		});
	 }
	 
	 /*编辑页面的select选择框问题*/
	var sel_val;
	$("#select_kinds").click(function(){
		sel_val=$("#select_kinds").val();
		if(sel_val==0){
			$("#petrochina_input").css('display','none');
			$("#sinopec_input").css('display','block');
		}
		if(sel_val==1){
			$("#sinopec_input").css('display','none');
			$("#petrochina_input").css('display','block');
		}
	});
	$("#delete_edit").click(function(){
		$.confirm('删除加油卡？',function(){
			$.toast("删除成功");
		},function(){
			//取消操作
		});
	});
	$("#save_edit").click(function(){
		var edit_input;
		sel_val=$("#select_kinds").val();
		if(sel_val==0){
			edit_input=$("#sinopec_input").val();
		}
		if(sel_val==1){
			edit_input=$("#petrochina_input").val();
		}
		if(edit_input==""){
			$.alert("加油卡卡号不能为空！");
		}else{
			console.log(edit_input);
			$.toast("保存成功");
		}
	});
	/*充值记录的加载效果*/
	var records=$("#loading .weui_cells");
	var record_list=$("#loading .weui_cells .info_show");
	var info=$("#loading .pay_money");
	var back=$("#loading .back");
	/*充值记录中的下拉效果*/
	records.each(function(index){
		$(this).click(function(){
			if(record_list.eq(index).attr('class')=='info_show'){
				info.eq(index).css("display",'none');
				back.eq(index).css('display','block');
				record_list.eq(index).slideDown();
				record_list.eq(index).removeClass('info_show');
			}else{
				back.eq(index).css("display",'none');
				info.eq(index).css('display','block');
				record_list.eq(index).attr('class','info_show');
				record_list.eq(index).slideUp();
			}
		});
	});
	var loading = false;  //状态标记
	/*text为加载内容，后续修改*/
	var text='<div class="weui_cells">'
  			+'<div class="weui_cell border_bot">'
    			+'<div class="weui_cell_bd weui_cell_primary btn_gary">'
     			 	+'<i class="fa fa-check-circle"></i>&nbsp;加载的内容'
    			+'</div>'
    			+'<div class="weui_cell_ft sign">'
      			+'2015-09-12 17:29'
    			+'</div>'
  			+'</div>'
  			+'<div class="weui_cell border_bot">'
    			+'<div class="weui_cell_bd weui_cell_primary col">'
     			 	+'<p>中石化加油卡充值</p>'
    			+'</div>'
    			+'<div class="weui_cell_ft btn_gary">'
      			+'￥184'
    			+'</div>'
  			+'</div>'
  			+'<div class="info_show">'
  				+'<div class="weui_cell border_bot ">'
    				+'<ul class="records_list">'
    					+'<li>订单号<span>812783612391287387172387</span></li>'
    					+'<li>加油卡号<span>1234567890123456</span></li>'
    				+'</ul>'
  				+'</div>'
  			+'</div>'
  			+'<div class="weui_cell btn_right peil_record">'
      			+'<a href="javascript:;" class="gas_small_btn border_rad3 btn_gary btn_pad pay_money">详情</a>'
      			+'<a href="javascript:;" class="gas_small_btn border_rad3 btn_gary btn_pad back">收起</a>'
  			+'</div>';
		$(document.body).infinite().on("infinite", function() {
		  if(loading) return;
		  loading = true;
		  setTimeout(function() {
		    $("#loading").append(text);
		    loading = false;
		  }, 800);   //模拟延迟
		});	
});
