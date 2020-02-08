/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	var roxyFileman = '/fileman/index.html';
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];
	config.extraPlugins = "print,justify,preview,widget,specialchar,autolink,smiley,colorbutton";

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
	config.skin = "moono-lisa";

	config.contentsLangDirection = 'rtl';
	config.language = 'fa';
	// var roxyFileman = '/fileman/index.html';
	// config.filebrowserBrowseUrl = roxyFileman;
    // config.filebrowserImageBrowseUrl = roxyFileman+'?type=image';
    // config.removeDialogTabs = 'link:upload;image:upload';
	config.filebrowserBrowseUrl = '/filemanager/dialog.php?type=2&editor=ckeditor&fldr=';
	config.filebrowserUploadUrl = '/panel/image/upload';
	config.filebrowserImageBrowseUrl = '/filemanager/dialog.php?type=1&editor=ckeditor&fldr=';
};
