var scrollView = Ti.UI.createScrollableView({
    backgroundColor: 'black'
    /*
      top:0,
      contentWidth: 'auto',
      contentHeight: 'auto',
      showVerticalScrollIndicator:true
    */
});

var reblogkey = [];
var postid = [];

var Load = {
    run : function(){
	var views = [];
	var url = 'http://www.tumblr.com/api/dashboard/json?debug=1&email=poleon.kd@gmail.com&password=&num=10';
	
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
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["regular-title"] + '<br>' + e["regular-body"];
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "link"){
		    //Ti.API.info(e["link-text"]);
		    //Ti.API.info(e["link-description"]);
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["link-text"] + '<br>' + e["link-description"];
		    view.add(v);
		    scrollView.addView(view);
		    
		}else if(e.type == "photo"){
		    //Ti.API.info(e["photo-url-400"]);
		    //Ti.API.info(e["photo-caption"]);
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({backgroundColor:'black'});
		    image = Ti.UI.createImageView({
			image:e["photo-url-500"]
		    });
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
			
		    });
		    v.html = e["photo-caption"];
		    view.add(image);
		    //view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "quote"){
		    //Ti.API.info(e["quote-text"]);
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["quote-text"] + '<br>' + e["quote-source"];
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "conversation"){
		    //Ti.API.info(e.type);
		    //Ti.API.info(e["conversation-title"]);
		    //Ti.API.info(e["conversation-text"]);
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["conversation-title"] + '<br>' + e["conversation-text"];
		    view.add(v);
		    scrollView.addView(view);
		}else if(e.type == "video"){
		    Ti.API.info(e["reblog-key"]);
		    postid[i] = e.id;
		    reblogkey[i] = e["reblog-key"];
		    
		    view = Ti.UI.createView({backgroundColor:'black'});
		    v = Ti.UI.createWebView({
			backgroundColor:'white'
		    });
		    v.html = e["video-caption"] + '<br>' + e["video-source"] + '<br>'+ e["video-player"];
		    view.add(v);
		    scrollView.addView(view);

		}
	    }
	};
	loader.send();
	mainWin.add(scrollView);
    }
}