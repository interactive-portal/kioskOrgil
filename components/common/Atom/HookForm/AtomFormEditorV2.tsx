import { CKEditor } from "ckeditor4-react";
import { useToggle } from "react-use";

const AtomFormEditorV2 = ({
  defaultValue,
  fieldName,
  hookForm,
}: {
  defaultValue?: any;
  fieldName: string;
  hookForm?: any;
}) => {
  const [editorReady, setEditorReady] = useToggle(false);
  // Одоо энд Template Content оруулна.

  const config = {
    // CKEDITOR.editorConfig = function( config ) {
    //   config.toolbarGroups = [
    //     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    //     { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    //     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
    //     { name: 'forms', groups: [ 'forms' ] },
    //     '/',
    //     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    //     { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
    //     { name: 'links', groups: [ 'links' ] },
    //     { name: 'insert', groups: [ 'insert' ] },
    //     '/',
    //     '/',
    //     '/',
    //     { name: 'styles', groups: [ 'styles' ] },
    //     { name: 'colors', groups: [ 'colors' ] },
    //     { name: 'tools', groups: [ 'tools' ] },
    //     { name: 'others', groups: [ 'others' ] },
    //     { name: 'about', groups: [ 'about' ] }
    //   ];
    // };
  };

  return (
    <>
      {!editorReady && <>Editor-ийг ачаалж байна</>}

      <CKEditor
        initData={defaultValue}
        config={{
          uiColor: "#d9ede8",
          toolbarLocation: "top",
          plugins: plugins,
          extraPlugins: extraPlugins,
          toolbar: toolbar,
          format_tags: "p;h3", //"p;h2;h3;h4;div"
          disallowedContent:
            "span{font,font-size,font-family}; div{font,font-size,font-family}",
          allowedContent:
            "p; strong; h3; img[src,class, alt](*); div[class](*); span; ul; li; ol; td; tr; td",

          uploadUrl: "/api/uploadimage",
          resizeDir: "vertical",
          width: "100%",
          autoGrowMinHeight: 200,
          autoGrowMaxHeight: 600,
          autoGrowBottomSpace: 50,
          templates_replaceContent: false,
          templates: "templates_jagaa",
          templates_files: [
            "https://res.cloudinary.com/dzih5nqhg/raw/upload/v1673337507/cozy/test/templatesjagaa_w7yivd.js",
          ],
          // contentsCss: "styles/globals.css",
          contentsCss: [
            "https://res.cloudinary.com/dzih5nqhg/raw/upload/v1673339417/cozy/test/aaa.min_s9jydo.css",
            // https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css
          ],
        }}
        debug={false}
        style={{ borderColor: "#54ADAE" }}
        onInstanceReady={() => {
          console.log("Editor is ready!");
          setEditorReady(true);
        }}
        onChange={(evt: any) => {
          const data = evt.editor.getData();
          hookForm?.setValue(fieldName, data);
        }}
      />
    </>
  );
};

export default AtomFormEditorV2;

const plugins =
  "basicstyles,dialogui,dialog,notification,button,toolbar,clipboard,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,fakeobjects,link,list,undo,horizontalrule,xml,ajax,templates,sourcearea,image,table,maximize,link,format,blockquote";

const extraPlugins = "uploadimage, autogrow, templates, resize";

const toolbar = [
  {
    name: "clipboard",
    items: ["Cut", "Copy", "Paste", "PasteText", "-", "Undo", "Redo"],
  },
  { name: "links", items: ["Link", "Unlink"] },
  {
    name: "basicstyles",
    items: [
      "Bold",
      "Italic",
      "Underline",
      "Strike",
      "-",
      "Subscript",
      "Superscript",
    ],
  },
  {
    name: "paragraph",
    items: [
      "NumberedList",
      "BulletedList",
      "-",
      "Outdent",
      "Indent",
      "-",
      "Blockquote",
    ],
  },
  "/",
  { name: "tools", items: ["Maximize", "Source"] },
  { name: "styles", items: ["Format"] },
  {
    name: "insert",
    items: ["Image", "Table", "HorizontalRule", "Templates"],
  },
  "/",
];
