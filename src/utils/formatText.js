export function formatTitleNote(receivedTitleNote, receivedTextNote) {
  if (receivedTitleNote == '') {
    const formatedTitleNote = receivedTextNote.split('\n');
    return formatedTitleNote[0];
  }
  return receivedTitleNote;
}

export function formatTextNote(receivedTitleNote, receivedTextNote) {
  const MIN_LENGTH = 86;
  const NUM_SLICE = 20;

  if (receivedTextNote.length >= MIN_LENGTH && receivedTitleNote == '') {
    const formatedTextNote = '...' + receivedTextNote.slice(NUM_SLICE);
    return formatedTextNote;
  }

  if (receivedTitleNote != ''){
    return receivedTextNote;
  }
}