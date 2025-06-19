import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { TagContainer, TagPill, TagInput, TagCloseIcon } from './styles';

export const BlogFormTags = ({ tags, setTags, tagInput, setTagInput }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTag = async () => {
    const newTag = tagInput.trim();
    if (!newTag || tags.includes(newTag)) return;

    setIsAdding(true);

    // Simulate async delay — replace with actual logic if needed
    await new Promise(resolve => setTimeout(resolve, 300));

    setTags([...tags, newTag]);
    setTagInput('');
    setIsAdding(false);
  };

  const handleKeyDown = async e => {
    if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
      e.preventDefault();
      await handleAddTag();
    } else if (e.key === 'Backspace' && !tagInput) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Tags</Form.Label>
      <TagContainer>
        {tags.map((tag, idx) => (
          <TagPill key={idx}>
            {tag}
            <TagCloseIcon
              size={10}
              onClick={() => setTags(tags.filter((_, i) => i !== idx))}
            />
          </TagPill>
        ))}

        <TagInput
          type="text"
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add New Tag"
          disabled={isAdding}
        />

        {/* <Button
          size="sm"
          variant="primary"
          style={{ height: '38px' }}
          disabled={!tagInput.trim() || isAdding}
          onClick={handleAddTag}
        >
          {isAdding ? <Spinner animation="border" size="sm" /> : 'Add New Tag'}
        </Button> */}
      </TagContainer>
    </Form.Group>
  );
};
