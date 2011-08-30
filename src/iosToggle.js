/**
 * @class Ext.form.iosToggle
 * @extends Ext.form.Toggle
 * <p>Specialized Slider with a single thumb and only two values. By default the toggle component can
 * be switched between the values of 0 and 1.</p>
 * @xtype iostogglefield
 */
Ext.form.iosToggle = Ext.extend(Ext.form.Toggle, {
    
    inputCls: 'x-ios-slider x-slider', 
    /**
     * @cfg {String} minValueCls CSS class added to the field when toggled to its minValue
     */
    minValueCls: 'x-iostoggle-off',

    /**
     * @cfg {String} maxValueCls CSS class added to the field when toggled to its maxValue
     */
    maxValueCls: 'x-iostoggle-on',
    
    /**
    * @cfg {String} minText default text for minValue
    */
    minText : 'OFF',
    
    /**
    * @cfg {String} maxText default text for maxValue
    */
    maxText:'ON',
    
    /**
    * @cfg {boolean} fullWidth if slider to take full field width
    */
    fullWidth : false,
    // inherit docs
    setValue: function(value) {
        
        Ext.form.iosToggle.superclass.setValue.call(this, value, this.animationDuration);
        var fieldEl = this.fieldEl,thumbText;
       
       
       
        if (this.constrain(value) === this.minValue) {
            fieldEl.addCls(this.minValueCls);
            fieldEl.removeCls(this.maxValueCls);
            thumbText = this.minText;
        }
        else {
            fieldEl.addCls(this.maxValueCls);
            fieldEl.removeCls(this.minValueCls);
            thumbText = this.maxText;
        }
        Ext.get(this.el.query(".x-toggle-thumb-iosthumb")[0]).update(thumbText);
        this.onOrientationChange();
    },
    getThumbClass: function() {
        return Ext.form.Toggle.iosThumb;
    },
    adjustToggleWidth : function(){
        var fieldEl = this.fieldEl,
            fullWidth   = this.el.dom.clientWidth,
            labelWidth  = (this.labelEl) ? this.labelEl.dom.clientWidth : 0,
            fieldWidth  = fullWidth - labelWidth;
             
        fieldEl.setWidth(fieldWidth-20);
        return true;
    },
    afterRender: function(ct) {
        var me = this;
        
        
        me.renderThumbs();
        
        Ext.form.Slider.superclass.afterRender.apply(me, arguments);

        me.fieldEl.on({
            scope: me,
            tap  : me.onTap
        });
        
        if(me.fullWidth){
            me.adjustToggleWidth();
        }
    }
});

Ext.reg('iostogglefield', Ext.form.iosToggle);


/**
 * @class Ext.form.Toggle.iosThumb
 * @extends Ext.form.Slider.Thumb
 * @private
 * @ignore
 */
Ext.form.Toggle.iosThumb = Ext.extend(Ext.form.Slider.Thumb, {
    onRender: function() {
        Ext.form.Toggle.iosThumb.superclass.onRender.apply(this, arguments);
        Ext.DomHelper.append(this.el, [{
            cls: 'x-toggle-thumb-iosthumb'
        }]);
    }
});
