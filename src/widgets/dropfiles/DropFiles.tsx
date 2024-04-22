// import node module libraries
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "react-bootstrap";

const thumbsContainer = `
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
`;

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = `
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
`;

const img = `
  display: "block",
  width: "auto",
  height: "100%",
`;

export const DropFiles = (props: any) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file: any) => (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 2,
        border: "1px solid #eaeaea",
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: "border-box",
      }}
      key={file.name}
    >
      <div style={{ display: "flex", minWidth: 0, overflow: "hidden" }}>
        <Image
          src={file.preview}
          style={{
            display: "block",
            width: "auto",
            height: "100%",
          }}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-center">
          Drag drop some files here, or click to select files
        </p>
      </div>
      <aside
        style={{
          display: "flex",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {thumbs}
      </aside>
    </section>
  );
};
