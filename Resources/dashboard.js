mainWin = Ti.UI.currentWindow;
Ti.include('load.js');

var mail = null, pswd = null;
var start = 0;

Ti.App.Properties.removeProperty("ml");

if(!Ti.App.Properties.hasProperty("ml") || !Ti.App.Properties.hasProperty("pw")){
    Ti.API.info("can't find the account");
    var account_view = Ti.UI.createView({
	backgroundColor:'black',
	top:10
    });
    var mail_field = Ti.UI.createTextField({
	top: 60, left: 10, right: 10, height:40,
	hintText:'mail address',
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS
    });
    mail_field.addEventListener('change', function(e){
	//Ti.API.info(e.value);
	mail = e.value;
	Ti.App.Properties.setString("ml", e.value);
    });

    var pswd_field = Ti.UI.createTextField({
	top: 100, left: 10, right: 10, height:40,
	hintText:'password',
	clearButtonMode:Titanium.UI.INPUT_BUTTONMODE_ONFOCUS,
	passwordMask:true,
	softKeyboardOnFocus : Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
	returnKeyType:Ti.UI.RETURNKEY_DONE
    });
    pswd_field.addEventListener('change', function(e){
	//Ti.API.info(e.value);
	pswd = e.value;
	Ti.App.Properties.setString("pw", e.value);
    });

    var login = Ti.UI.createButton({
	title: 'Sign in',
	font:{
	    fontFamily:'Trebuchet MS',
	    fontWeight:'bold',
	    fontStyle:'italic'
	},
	color: '#ff0000',
	height: 40,
	left: 10, right: 10,
	top: 140
    })
    login.addEventListener('click', function(e){
	mainWin.remove(account_view);
	pswd_field.blur();
	Load.run(start);

    });

    account_view.add(mail_field);
    account_view.add(pswd_field);
    account_view.add(login);
    mainWin.add(account_view);

}else{
    Ti.API.info("already set the account");
    mail = Ti.App.Properties.getString("ml");
    pswd = Ti.App.Properties.getString("pw");
    Load.run(start);
}
