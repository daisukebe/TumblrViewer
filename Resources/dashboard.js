Ti.include('load.js');
Ti.include('account.js');
mainWin = Ti.UI.currentWindow;

var start = 0;

Load.run(start);

scrollView.addEventListener('doubletap', function(e){
    Ti.API.info('doubletaped:' + scrollView.currentPage);
    //Ti.API.info(reblogkey[scrollView.currentPage]);
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
	    "post-id":postid[scrollView.currentPage],
	    "reblog-key":reblogkey[scrollView.currentPage]
	});
    }catch(error){
	Ti.API.info(error);
    }
    Ti.API.info('rebloged...');
	
});

scrollView.addEventListener('scroll', function(e){
    Ti.API.info('current page:' + scrollView.currentPage);
    
    if(scrollView.currentPage > start + 10){
	Ti.API.info('reload');
	start += 20;
	Load.run(start);
    }

});