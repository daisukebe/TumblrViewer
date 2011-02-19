var color = 'black'; //#2C4762
//var color = 'transparent';
var scrollView = Ti.UI.createScrollableView({backgroundColor: color});

var reblogkey = [];
var postid = [];

var Load = {
    reblog : function(id, key){
	Ti.API.info(id + ':' + key);
	if(Ti.Network.online == false){
	    Ti.API.info('network offline');
	    return;
	}
	
	try{
	    Ti.API.info('reblogging...');
	    var url = "http://www.tumblr.com/api/reblog";
	    var post = Ti.Network.createHTTPClient();
	    post.open('POST', url);
	    post.send({
		email:mail,
		password:pswd,
		"post-id":id,//postid[scrollView.currentPage],
		"reblog-key":key,//reblogkey[scrollView.currentPage]
	    });
	}catch(error){
	    Ti.API.info(error);
	}
	Ti.API.info('rebloged...');
    },
	
    run : function(start){
	Ti.API.info('reloading from ' + start);
	var views = [];
	//var url = 'http://daisukebe15.tumblr.com/api/read/json?debug=1&num=20';
	var url = 'http://www.tumblr.com/api/dashboard/json?debug=1&start=' + start + '&email=' + mail + '&password=' + pswd + '&num=20';
	Ti.API.info(start);
	
	var view = null;
	var image = null;
	var v = null;
	
	var loader = Titanium.Network.createHTTPClient();
	loader.open('GET', url);
	loader.onload = function(){
	    var re = this.responseText;
	    var data = JSON.parse(re);
	    data = data.posts;
	    for(var i = 0; i < data.length; i++){
		var e = data[i];
		Ti.API.info(i);
		if(e.type == "regular"){
		    //Ti.API.info(e["regular-title"]);
		    //Ti.API.info(e["regular-body"]);
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("regular");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createScrollView({
			backgroundColor:color,
			contentHeight:'auto',
			top:0,
			showVerticalScrollIndicator:true
		    });
		    v = Ti.UI.createWebView({
			backgroundColor:'white',
			height:'auto'
		    });
		    v.html = e["regular-title"] + '<br>' + e["regular-body"];
		    v.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
			
		    });
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "link"){
		    //Ti.API.info(e["link-text"]);
		    //Ti.API.info(e["link-description"]);
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("link");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createScrollView({
			backgroundColor:color,
			contentHeight:'auto',
			top:0,
			showVerticalScrollIndicator:true
		    });
		    v = Ti.UI.createWebView({
			backgroundColor:'white',
			height:'auto'
		    });
		    v.html = e["link-text"] + '<br>' + e["link-description"];
		    v.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
			
		    });
		    view.add(v);
		    scrollView.addView(view);
		    
		}else if(e.type == "photo"){
		    //Ti.API.info(e["photo-url-400"]);
		    //Ti.API.info(e["photo-caption"]);
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("photo");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({
			backgroundColor:color
		    });
		    image = Ti.UI.createImageView({
			image:e["photo-url-500"]
		    });
		    image.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
			
		    });
		    view.add(image);
		    //view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "quote"){
		    //Ti.API.info(e["quote-text"]);
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("quote");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createScrollView({
			backgroundColor:color,
			contentHeight:'auto',
			top:0,
			showVerticalScrollIndicator:true
		    });
		    v = Ti.UI.createWebView({
			backgroundColor:'white',
			//top:0,
			height:'auto'
		    });
		    v.html = e["quote-text"] + '<br>' + e["quote-source"];
		    v.addEventListener('doubletap', function(e){
			Ti.API.info('doubltaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
		    });
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "conversation"){
		    //Ti.API.info(e.type);
		    //Ti.API.info(e["conversation-title"]);
		    //Ti.API.info(e["conversation-text"]);
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("conversation");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createScrollView({
			backgroundColor:color,
			contentHeight:'auto',
			top:0,
			showVerticalScrollIndicator:true
		    });
		    v = Ti.UI.createWebView({
			backgroundColor:'white',
			height:'auto'
		    });
		    v.html = e["conversation-title"] + '<br>' + e["conversation-text"];
		    v.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
			
		    });
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "video"){
		    //Ti.API.info(e["reblog-key"]);
		    Ti.API.info("video");
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["video-caption"] + '<br>' + e["video-source"] + '<br>'+ e["video-player"];
		    v.addEventListener('doubletap', function(e){
			Ti.API.info('doubletaped:' + scrollView.currentPage);
			Load.reblog(postid[scrollView.currentPage], reblogkey[scrollView.currentPage]);
			
		    });
		    view.add(v);
		    scrollView.addView(view);

		}
	    }
	};
	loader.send();
	mainWin.add(scrollView);
    }
};
