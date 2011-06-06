var Account = {
    set: function(){
	var mainWin = Ti.UI.currentWindow;
	var account_view = Ti.UI.createView({
	    backgroundColor:'black',
	});
	var mail_field = Ti.UI.createTextField({
	    top: 60, left: 10, right: 10, height:80,
	    hintText:'mail address',
	    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	    softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
	});
	mail_field.addEventListener('change', function(e){
	    //Ti.API.info(e.value);
	    mail = e.value;
	});

	var pswd_field = Ti.UI.createTextField({
	    top: 140, left: 10, right: 10, height:80,
	    hintText:'password',
	    clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	    passwordMask:true,
	    softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
	    returnKeyType:Ti.UI.RETURNKEY_DONE
	});
	pswd_field.addEventListener('change', function(e){
	    //Ti.API.info(e.value);
	    pswd = e.value;
	});

	var login = Ti.UI.createButton({
	    title: 'Sign in',
	    font:{
		fontSize: 24,
		fontFamily:'Trebuchet MS',
		fontWeight:'bold',
		fontStyle:'italic'
	    },
	    color: 'black',
	    height: 80,
	    left: 10, right: 10,
	    top: 220
	})
	login.addEventListener('click', function(e){
	    Ti.App.Properties.setString("ml", mail);
	    Ti.App.Properties.setString("pw", pswd);
	    mainWin.remove(account_view);
	    pswd_field.blur();
	    Load.run(start);
	    
	});

	account_view.add(mail_field);
	account_view.add(pswd_field);
	account_view.add(login);
	mainWin.add(account_view);

    }

};