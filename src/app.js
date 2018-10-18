import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import InsertImage from './plugins/InsertImage.js';

import InlineItems from './plugins/InlineItems/index.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';


const plugins = [
    Essentials, // clipboard, Enter, ShiftEnter, typing and undo support
    //Paragraph,CKEditorError: schema-cannot-register-item-twice: A single item cannot be registered twice in the schema.
    Heading, 
    HeadingButtonsUI, 
    Bold, 
    Italic, 
    InlineItems, 
    Image, 
    InsertImage, 
    ImageCaption
];

const toolbar = [ 'heading2','bold', 'italic', 'insertImage',...['buyerzonewidget','comparisongrid','inlineimage','inlinevideo','product','relatedarticle','youtube'] ];

const Editor = ClassicEditor;




Editor
    .create( document.querySelector( '#editor' ),{
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
            ]
        },
        plugins: plugins,
        toolbar: toolbar
    } )
    .then( editor => {
        console.log( 'Editor was initialized', editor );
        window.editor = editor;
    } )
    .catch( error => {
        console.error( error.stack );
    } );

