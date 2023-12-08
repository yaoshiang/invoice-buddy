import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // include styles
import styled from 'styled-components';

const DEFAULT_TEXT = `
MARY ANN JOHNSON
Plaintiff
<br>
<br>
v.
<br>
<br>

JAMES C. SEXTON
Defendant
<br>
<br>

IN THE CIRCUIT COURT
FOR BALTIMORE CITY
CIVIL ACTION NO.:
<br>
<br>

COMPLAINT AND PRAYER FOR JURY TRIAL
<br>
<br>

Mary Ann Johnson, Plaintiff, by Ronald V. Miller, Jr. and Miller & Zois, LLC, her attorneys, sues the defendant, James C. Sexton, and in support, states as follows:
<br>
<br>

PREAMBLE
<br>
<br>

Mary Ann Johnson, the Plaintiff, is a resident of Maryland.
James C. Sexton, the Defendant, is a resident of Maryland.
The Defendant regularly visits and is engaged in business in Baltimore City, Maryland.
This action arises from a car accident that occurred on May 22, 2023, at the intersection of Maryland Route 152 and Rockford Road. Both are public roads in Maryland.
STATEMENT OF FACTS
<br>
<br>

On May 22, 2013, Plaintiff, Mary Ann Johnson, was carefully and prudently stopped in her motor vehicle on Route 152, when her vehicle was violently struck from behind by Defendant.
At the same time, a motor vehicle operated by James C. Sexton, Defendant, was traveling, and smashed into Plaintiff’s vehicle, causing a car accident in which Plaintiff sustained severe personal injuries.
More Samples
`;


// COUNT ONE
// <br>
// <br>

// Plaintiff, Mary Ann Johnson realleges and incorporates by reference all those facts and allegations in paragraphs 1 through 6 above and further alleges:
// <br>
// <br>

// The collision was caused by the recklessness, carelessness, and negligence of Defendant, James C. Sexton, for that among other acts and omissions Defendant:
// operated the motor vehicle at a high, dangerous, and excessive rate of speed under the circumstances then and there existing;
// failed to reduce speed to avoid a collision;
// failed to observe due care and precaution and to maintain proper and adequate control of the motor vehicle;
// failed to keep a proper lookout for other vehicles lawfully on the highway;
// failed to exercise reasonable care in the operation of the motor vehicle under the circumstances then and there existing; and
// In other respects not now known to the Plaintiff but which may become known before or at the time of trial.
// As a direct and proximate result of the negligence and carelessness of the Defendant, the Plaintiff:
// suffered serious, painful, and permanent bodily injuries, great physical pain and mental anguish, severe and substantial emotional distress, loss of the capacity for the enjoyment of life;
// was, is, and will be required to undergo medical treatment and incur medical costs and expenses to alleviate injuries, pain and suffering;
// was, is, and will be precluded from engaging in normal activities and pursuits, including a loss of ability to earn money and actual earnings;
// and, otherwise was hurt, injured, and caused to sustain losses.
// All of the Plaintiff’s losses were, are, and will be due to the carelessness and negligence of the Defendant, James C. Sexton, without any negligence or want of due care on the Plaintiff’s part contributing to the harm done.
// WHEREFORE, this Plaintiff claims ONE MILLION FIVE HUNDRED THOUSAND DOLLARS ($1,500,000.00) in damages.
// <br>
// <br>

// Respectfully submitted,
// Miller & Zois, LLC
// <br>
// <br>

// Ronald V. Miller
// Miller & Zois, LLC
// 1 South Street, Suite 2450
// Baltimore, MD 20201
// (410) 779-4600
// (410) 760-8922 (Fax)
// Attorneys for Plaintiffs

const StyledDocumentEditor = styled.div`
  .ql-editor {
    height: 100%; /* Full height of their container */
    max-height: 100%; /* Full height of their container */
    overflow: auto; /* Scroll if content overflows */
  }

  .ql-container {
    height: 100%;
    max-height: 100%; /* Full height of their container */
    border: none; /* Remove default Quill border */
    border-bottom-left-radius: 0.25rem; /* Match Bootstrap card border radius */
    border-bottom-right-radius: 0.25rem;
    overflow: auto; /* Scroll if content overflows */
  }
`;

const DocumentEditor = () => {
  const [text, setText] = React.useState(DEFAULT_TEXT);

  const handleChange = (content) => {
    setText(content);
  };

  return (
    <div className="card border-secondary p-1 m-1 h-100 overflow-hidden">
      <StyledDocumentEditor>
        <ReactQuill value={text} onChange={handleChange} />
      </StyledDocumentEditor>
    </div>
  );
};

export default DocumentEditor;
