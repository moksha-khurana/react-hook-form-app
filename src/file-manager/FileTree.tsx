import { FileNode } from './FileNode';

const fileTree = {
  name: 'root',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.tsx', type: 'file' },
        { name: 'index.tsx', type: 'file' },
      ],
    },
    {
      name: 'public',
      type: 'folder',
      children: [{ name: 'index.html', type: 'file' }],
    },
    { name: 'package.json', type: 'file' },
  ],
};

export const FileTree = () => {
  return (
    <div className="p-4 text-sm font-mono">
      <FileNode node={fileTree} />
    </div>
  );
};
