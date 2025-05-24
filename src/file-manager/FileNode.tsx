import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';

interface FileNodeProps {
  node: FileTreeNode;
}

interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
}

export const FileNode: React.FC<FileNodeProps> = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  const isFolder = node.type === 'folder';

  return (
    <div className="ml-4">
      <div
        onClick={() => isFolder && setExpanded(!expanded)}
        className="cursor-pointer flex items-center gap-2" 
      >
        {isFolder ? (
          expanded ? <FaFolderOpen /> : <FaFolder />
        ) : (
          <FaFile />
        )}
        <span>{node.name}</span>
      </div>

      {isFolder && expanded && node.children && (
        <div className="ml-4">
          {node.children.map((child, idx) => (
            <FileNode key={idx} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};
