var $$ = Dom7;
var app = new Framework7({
    root: '#app',
    name: 'F7App',
    id: 'com.ubaya.f7app',
    panel: { swipe: 'left' },
    theme: 'md',
    routes: [
    {
        path:'/userlain/:lainid',
        url: 'userlain.html',
        on: {       
                pageInit: function (e, page) {
                  var t = $$('#template').html();
                    var compiled = Template7.compile(t);                    
                    var context = {
                        nama: page.router.currentRoute.params.lainid
                    };
                    var html = compiled(context);
                    $$('.navbar-inner').html(html);   
                        localStorage.namauser = page.router.currentRoute.params.lainid;
                     app.request.post("http://127.0.0.1/pmnprojek/profil.php", 
                    {username:page.router.currentRoute.params.lainid}, function(data) { 
                    var d = JSON.parse(data);       
                    var template = $$('#profil').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(d);
                    $$('.page-content').html(html);    
                    });                               
                }     
            } 
    },

    {
        path:'/detail/:idposting',
        url: 'detailpost.html',
        on: {       
                pageInit: function (e, page) {
                  var t = $$('#templaten').html();
                    var compiled = Template7.compile(t);                    
                    var context = {
                        nama: localStorage.namauser
                    };
                    var html = compiled(context);
                    $$('.navbar-inner').html(html);   

                     app.request.post("http://127.0.0.1/pmnprojek/detail.php", 
                    {username: page.router.currentRoute.params.idposting}, function(data) { 
                    var d = JSON.parse(data);       
                    var template = $$('#alldetail').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(d);
                    $$('.page-content').html(html);    
                    });                               
                }     
            } 
            
    },

    {
path: '/login/',
url: 'login.html',
    },
        {
            path: '/home/',
            url: 'home.html',
            on: {
        pageInit: function(e,page) {
app.request.post("http://127.0.0.1/pmnprojek/home.php", 
    {}, function(data) { 
    var d = JSON.parse(data);       
        var template = $$('#allhome').html();
        var compiledTemplate = Template7.compile(template);
        var html = compiledTemplate(d);
        $$('.page-content').html(html);  
});
        }
    }

        },
        {
            path: '/search/',
            url: 'search.html',
            on:
            {
                pageInit: function (e, page) 
                {
                    app.request.get(
                        "http://192.168.43.198/pmnprojek/cariuser.php?cari=",{}, function(data)
                        {
                            var obj = JSON.parse(data);
                            for(var i=0; i < obj.length; i++) 
                            {
                                $$('#hasil').append('<li><a href="/userlain/' + obj[i]['username'] + '"/>' 
                                    + i + " " + obj[i]['username'] + '</a></li>');
                            }   

                        });
                    $$("#cari").on("keyup",function()
                    {
                        $$('#hasil').html('');
                        app.request.post(
                        "http://192.168.43.198/pmnprojek/cariuser.php?cari=" + $$('#cari').val(),{}, function(data)
                        {
                            var obj = JSON.parse(data);
                            for(var i=0; i < obj.length; i++) 
                            {
                                $$('#hasil').append('<li><a href="/userlain/' + obj[i]['username'] + '"/>' 
                                    + i + " " + obj[i]['username'] + '</a></li>');
                            }   

                        });
                    });
                    
                }
            }
        },
        {
			path: '/kamera/',
			url: 'kamera.html',
            on: {
                pageInit: function(e, page) {
                    var calendarDefault = app.calendar.create({
                      inputEl: '#bod',
                    });

                    $$('#btncoba').on('click', function() {
                        var jumlah = $$('#propic').length;
                        app.dialog.alert(jumlah);
                                var x = new FormData($$(".form-registrasi")[0]);
                                var komeng=x.get("komen");
        app.request.post('http://192.168.43.198/pmnprojek/registrasi.php', {username:localStorage.username, komen:komeng}, function (data) {
        app.dialog.alert(data);
    });
                        var imgUri = $$('#propic').attr('src');
                        var options = new FileUploadOptions();
options.fileKey = "photo";
options.fileName = imgUri.substr(imgUri.lastIndexOf('/') + 1);
options.mimeType = "image/jpeg";
options.params = {
            param1: "sembarang_value",
            param2: "sembarang_text"
        }
        var ft = new FileTransfer();
ft.upload(imgUri, 
encodeURI("http://192.168.43.198/pmnprojek/uploadpic.php"), 
            function(result){
                app.dialog.alert(JSON.stringify(result));
}, function(error){
    app.dialog.alert(JSON.stringify(error));
            }, options);                       
                    });
                    $$('#btnpic').on('click',function(e) {                
        navigator.camera.getPicture(onSuccess, onFail, {quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 720,
        targetHeight: 1280,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
        });
function onSuccess(imageData) { 
$$('#propic').attr('src', "data:image/jpeg;base64," + imageData);   
}
function onFail(message) {
 app.dialog.alert('Failed because: ' + message);
}
});

        $$('#btnpic2').on('click',function(e) {                
        navigator.camera.getPicture(onSuccess, onFail, {quality: 100,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: true
        });
function onSuccess(imageData) { 
$$('#propic').attr('src', "data:image/jpeg;base64," + imageData);   
}
function onFail(message) {
 app.dialog.alert('Failed because: ' + message);
}
});

        $$('#btnfoto').on('click',function(e) {                
        navigator.camera.getPicture(onSuccess, onFail, {quality: 100,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 720,
        targetHeight: 1280,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
        });
function onSuccess(imageData) { 
$$('#propic').attr('src', "data:image/jpeg;base64," + imageData);   
}
function onFail(message) {
 app.dialog.alert('Failed because: ' + message);
}
});
                }, 
            }
		},
        {
            path: '/notif/',
            url: 'notif.html',
        },

        {
            path: '/profildetail/:pd',
            url: 'profildetail.html',
            on: {       
                pageInit: function (e, page) {
                  var t = $$('#pd').html();
                    var compiled = Template7.compile(t);                    
                    var context = {
                        nama: localStorage.username
                    };
                    var html = compiled(context);
                    $$('.navbar-inner').html(html);   

                     app.request.post("http://192.168.43.198/pmnprojek/detail.php", 
                    {username: page.router.currentRoute.params.pd}, function(data) { 
                    var d = JSON.parse(data);       
                    var template = $$('#allpd').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(d);
                    $$('.page-content').html(html);    
                    });                               
                }     
            } 
        },

        {
           path: '/index/',
            url: 'index.html', 
            on: {       
                pageInit: function (e, page) 
                {
                    if(!localStorage.username) {                
                       page.router.navigate('/login/');
                    }
                    var t = $$('#template').html();
                    var compiled = Template7.compile(t);                    
                    var context = {
                        nama: localStorage.username
                    };
                    var html = compiled(context);
                    $$('.navbar-inner').html(html);  

                    app.request.post("http://192.168.43.198/pmnprojek/profil.php", 
                    {username:localStorage.username}, function(data) { 
                    var d = JSON.parse(data);       
                    var template = $$('#profil').html();
                    var compiledTemplate = Template7.compile(template);
                    var html = compiledTemplate(d);
                    $$('.page-content').html(html);    
                    });   

                }, 
                // pageAfterIn: function (event, page) {   
                //     if(!localStorage.username) {             
                //      page.router.navigate('/login/');
                //     }
                // }     
            }           
        },
    ]
});
$$(document).on('page:init', function (e, page) {
    if(page.name == "login") {  
        app.panel.disableSwipe();
    }
$$('#logout').on('click', function()
{
localStorage.clear()
mainView.router.navigate("/login/");
});
$$('#btnsubmit').on('click', function() {
	var x = new FormData($$(".form-ajax-submit")[0]);
app.request.post('http://127.0.0.1/pmnprojek/login.php', x, function (data) {
    var user=x.get("username");
        if(data == "sukses")
        {
             app.dialog.alert("selamat datang " + user);
             localStorage.username = user;
             mainView.router.navigate("/index/");
        }
        else
        { 
            app.dialog.alert("gagal login");
        }
	});
});
});
var mainView = app.views.create('.view-main', {url : '/index/'} );

// create searchbar