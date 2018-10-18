import Plugin from '@ckeditor/ckeditor5-core/src/plugin';;
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import { upcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';
import { downcastElementToElement } from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';

import { toWidget, isWidget } from '@ckeditor/ckeditor5-widget/src/utils';


class InlineItems extends Plugin {
    init() {
        const editor = this.editor;

        ['buyerzonewidget','comparisongrid','inlineimage','inlinevideo','product','relatedarticle','youtube'].forEach(iconName=>{
            
            //Data in CKEditor is basically stored in custom elements which are inserted into the "model".

            //First register the custom element. You can add certain rules here like where can the element go.
            editor.model.schema.register( iconName, {
                inheritAllFrom: '$text',
                isObject:true
            } );

           //Here you have to define how the model turns into HTML. "upcasting" would be the opposite. Not sure if necessary here.
            this.editor.conversion.for('downcast').add(downcastElementToElement({
                model:iconName,
                view:{
                    name:'span',
                    styles: {
                        'color': 'green'
                    }
                }
            }))


            /*
            this.editor.conversion.for( 'editingDowncast' ).add( downcastElementToElement( {
                model: iconName,
                view: ( modelElement, viewWriter ) => toWidget( createImageViewElement( viewWriter ), viewWriter, t( 'image widget' ) )
            } ) );*/
    

            //Add a component to the component factory. Here you add the button. 
            this.editor.ui.componentFactory.add( iconName, locale => {
                const view = new ButtonView( locale );
    
                //ButtonView props to set.
                view.set( {
                    label: `Insert ${iconName}`,
                    icon: require(`./icons/${iconName}.svg`),
                    tooltip: true
                } );
    
                // Callback executed once the image is clicked.
                view.on( 'execute', () => {
                    
                    //This is not a listener. This tells the model to change.
                    this.editor.model.change( writer => {
                        let element = writer.createElement( iconName );
                        writer.appendText( iconName, element );
                        writer.insert(element,editor.model.document.selection.getFirstPosition());
                    } );
                    
                } );
    
                return view;
            } );    
        })
        
    }
}

export default InlineItems;
