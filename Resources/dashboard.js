Ti.include('load.js');
mainWin = Ti.UI.currentWindow;

Load.run();

scrollView.addEventListener('doubletap', function(e){
    //Ti.API.info(scrollView.currentPage);
    //Ti.API.info(reblogkey[scrollView.currentPage]);
    if(Ti.Network.online == false){
	Ti.API.info('network offline');
	return;
    }

    try{
	var url = "http://www.tumblr.com/api/reblog";
	var post = Ti.Network.createHTTPClient();
	post.open('POST', url);
	post.send({
	    email:"poleon.kd@gmail.com",
	    password:"",
	    "post-id":postid[scrollView.currentPage],
	    "reblog-key":reblogkey[scrollView.currentPage]
	});
    }catch(error){
	Ti.API.info(error);
    }
	
});

