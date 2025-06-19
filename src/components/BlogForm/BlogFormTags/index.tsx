import { Form } from 'react-bootstrap';
import {
  TagContainer,
  TagPill,
  TagInput,
  TagCloseIcon
} from './styles';

export const BlogFormTags = ({ tags, setTags, tagInput, setTagInput }) => (
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
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !tags.includes(newTag)) {
              setTags([...tags, newTag]);
              setTagInput('');
            }
          } else if (e.key === 'Backspace' && !tagInput) {
            setTags(tags.slice(0, -1));
          }
        }}
        placeholder="Add tag"
      />
    </TagContainer>
  </Form.Group>
);
