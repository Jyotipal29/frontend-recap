import "./file.css";
import { useState } from "react";

const File = ({ data, tree, setTree }) => {
  const [expanded, setExpanded] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    type: "",
  });

  // ---------------- INSERT ----------------

  const insertNode = (node, folderId, name, type) => {
    if (node.id === folderId && node.type === "folder") {
      return {
        ...node,
        children: [
          {
            id: Date.now(),
            name,
            type,
            children: type === "folder" ? [] : undefined,
          },
          ...(node.children || []),
        ],
      };
    }

    if (!node.children) return node;

    return {
      ...node,
      children: node.children.map((child) =>
        insertNode(child, folderId, name, type)
      ),
    };
  };

  // ---------------- RENAME ----------------

  const renameNode = (node, id, newName) => {
    if (node.id === id) {
      return {
        ...node,
        name: newName,
      };
    }

    if (!node.children) return node;

    return {
      ...node,
      children: node.children.map((child) =>
        renameNode(child, id, newName)
      ),
    };
  };

  // ---------------- DELETE ----------------

  const deleteNode = (node, id) => {
    if (!node.children) return node;

    return {
      ...node,
      children: node.children
        .filter((child) => child.id !== id)
        .map((child) => deleteNode(child, id)),
    };
  };

  // ---------------- HANDLERS ----------------

  const showInputHandler = (e, type) => {
    e.stopPropagation();

    setExpanded(true);

    setShowInput({
      visible: true,
      type,
    });
  };

  const handleAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      const updatedTree = insertNode(
        tree,
        data.id,
        e.target.value,
        showInput.type
      );

      setTree(updatedTree);

      setShowInput({
        visible: false,
        type: "",
      });
    }
  };

  const handleRename = (e) => {
    e.stopPropagation();

    const newName = prompt("Enter new name");

    if (!newName) return;

    setTree(renameNode(tree, data.id, newName));
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    setTree(deleteNode(tree, data.id));
  };

  return (
    <div className="file-container">
      <div
        className="file-name"
        onClick={() => setExpanded(!expanded)}
      >
        {data.type === "folder"
          ? expanded
            ? "📂"
            : "📁"
          : "📄"}

        <span>{data.name}</span>

        <button onClick={handleRename}>Rename</button>

        <button onClick={handleDelete}>Delete</button>

        {data.type === "folder" && (
          <>
            <button
              onClick={(e) => showInputHandler(e, "folder")}
            >
              + Folder
            </button>

            <button
              onClick={(e) => showInputHandler(e, "file")}
            >
              + File
            </button>
          </>
        )}
      </div>

      {expanded && (
        <div className="children-container">
          {showInput.visible && (
            <input
              autoFocus
              placeholder={`Enter ${showInput.type} name`}
              onKeyDown={handleAdd}
              onBlur={() =>
                setShowInput({
                  visible: false,
                  type: "",
                })
              }
            />
          )}

          {data.children?.map((item) => (
            <File
              key={item.id}
              data={item}
              tree={tree}
              setTree={setTree}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default File;