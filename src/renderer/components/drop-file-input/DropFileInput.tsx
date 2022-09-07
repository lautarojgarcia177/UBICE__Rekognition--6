import { useRef } from 'react';
import { FileDrop } from 'react-file-drop';
import { Upload } from 'react-feather';
import './drop-file-input.css';

type DropFileInputProps = {
  onFileInputChange: (event: any) => void;
  onDrop: (files, event) => void;
};

const DropFileInput = (props: DropFileInputProps) => {
  const fileInputRef = useRef(null);
  const { onFileInputChange, onDrop } = props;

  // Event handlers
  const onTargetClick = () => {
    fileInputRef.current.click();
  };
  const onMouseOver = (event: any) => {
    // console.log('on mouse over!');
  };
  const onFrameDragEnter = (event: any) => {
    // console.log('onFrameDragEnter!');
  };
  const onFrameDragLeave = (event: any) => {
    // console.log('onFrameDragLeave!');
  };
  const onFrameDrop = (event: any) => {
    // console.log('onFrameDrop!', event);
  };
  const onDragOver = (event: any) => {
    // console.log('onDragOver!');
  };
  const onDragLeave = (event: any) => {
    // console.log('onDragLeave!');
  };

  return (
    <>
      <input
        multiple
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
      />
      <FileDrop
        onFrameDragEnter={onFrameDragEnter}
        onFrameDragLeave={onFrameDragLeave}
        onFrameDrop={onFrameDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onTargetClick={onTargetClick}
      >
        <Upload size={48} />
      </FileDrop>
    </>
  );
};

export default DropFileInput;
