import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { BlogCategories } from "config/blog-config";
import { CategoryListContainer } from './styles';

export const BlogFormCategories = ({ editCategory, onChange }) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(BlogCategories);
  const [selected, setSelected] = useState(editCategory || "");

  useEffect(() => {
    const results = BlogCategories.filter((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search]);

  const handleSelect = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Form.Group className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="mb-0 me-2">Category</Form.Label>
            <div style={{ position: 'relative', width: '50%' }}>
                <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-control form-control-sm pe-4"
                />
                {search && (
                <span
                    onClick={() => setSearch("")}
                    style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "bold",
                    }}
                >
                    ×
                </span>
                )}
            </div>
        </div>
        <CategoryListContainer>
            {filtered.length === 0 ? (
                <div
                    style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6c757d"
                    }}
                >
                    No results found
                </div>
            ) : (
                filtered.map((category) => (
                    <div
                    key={category}
                    className={`p-2 rounded mb-1 cursor-pointer ${
                        selected === category ? 'bg-primary text-white' : 'hover-bg-light'
                    }`}
                    onClick={() => handleSelect(category)}
                    style={{ cursor: 'pointer' }}
                    >
                    {category}
                    </div>
                ))
            )}
        </CategoryListContainer>
    </Form.Group>
  );
};
