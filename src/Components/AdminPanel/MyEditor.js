// CKEditor.js
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// CKEditor.js

const MyEditor = ({ data_showe, onChange }) => {
  return (
    <div className="App">
      <CKEditor editor={ClassicEditor} data={data_showe} onChange={onChange} />
    </div>
  );
};

export default MyEditor;
