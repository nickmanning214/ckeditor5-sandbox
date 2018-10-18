import Plugin from '@ckeditor/ckeditor5-core/src/plugin';;
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';


class BuyerZone extends Plugin {
    init() {
        const editor = this.editor;

        //registers a view so that it can be added to the editor via toolbar
        editor.ui.componentFactory.add( 'insertBuyerZone', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Insert Buyerzone Widget',
                icon: require('./icon.svg'),
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
                const imageUrl = prompt( 'Image URL' );

                editor.model.change( writer => {
                    const imageElement = writer.createElement( 'image', {
                        src: imageUrl
                    } );

                    // Insert the image in the current selection location.
                    editor.model.insertContent( imageElement, editor.model.document.selection );
                } );
            } );

            return view;
        } );
    }
}

export default BuyerZone;
