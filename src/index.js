

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function() {

        var form;
        
        Ext.regModel('User', {
            fields: [
                {name: 'gender',   type: 'boolean'}
            ]
        });
        
    
        
        var formBase = {
            scroll: 'vertical',
            url   : 'postUser.php',
            standardSubmit : false,
            items: [{
                    xtype: 'fieldset',
                    title: 'Personal Info',
                    instructions: 'Please enter the information above.',
                    defaults: {
                        required: true,
                        labelAlign: 'left',
                        labelWidth: '40%'
                    },
                    items: [{
                        xtype: 'iostogglefield',
                        name : 'gender',
			fullWidth : true,
                        label: 'Gender',
			minText : 'Male',
			maxText : 'Female'
                    },{
                        xtype: 'iostogglefield',
                        name : 'status',
			label: 'Status',
			minText : 'Y',
			maxText : 'N'
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'Single Toggle (in fieldset)',
                    items: [{
                        xtype: 'iostogglefield',
			fullWidth : true,
                        name: 'single_toggle',
                        value : 1
                    }]
                },
		{
                    xtype: 'fieldset',
                    title: 'Single Toggle (in fieldset)',
                    items: [{
                        xtype: 'iostogglefield',
			name: 'single_toggle_small',
                        value : 1
                    }]
                }
            ],
            listeners : {
                submit : function(form, result){
                    console.log('success', Ext.toArray(arguments));
                },
                exception : function(form, result){
                    console.log('failure', Ext.toArray(arguments));
                }
            },
        
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Load Model',
                            ui: 'round',
                            handler: function() {
                                formBase.user = Ext.ModelMgr.create({
                                    'gender'  : 1
                                }, 'User');
        
                                form.loadModel(formBase.user);
                            }
                        },
                        {xtype: 'spacer'},
                        {
                            text: 'Reset',
                            handler: function() {
                                form.reset();
                            }
                        },
                        {
                            text: 'Save',
                            ui: 'confirm',
                            handler: function() {
                                if(formBase.user){
                                    form.updateRecord(formBase.user, true);
                                }
                                form.submit({
                                    waitMsg : {message:'Submitting', cls : 'demos-loading'}
                                });
                            }
                        }
                    ]
                }
            ]
        };
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: false,
                fullscreen : true
                //hideOnMaskTap: false,
                //height: 385,
                //width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        form.show();
    }
});