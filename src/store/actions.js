import { nanoid } from 'nanoid';

function getPosInArray(receivedArray, receivedNoteId) {
  let index = false;
  receivedArray.forEach((currentNote, currentIndex) => {
    if (currentNote.id == receivedNoteId) 
    return index = currentIndex;
  })
  return index;
}

export function getNewStorage(nameStorage) {
  let getStorage = [];

  try {
    getStorage = JSON.parse(localStorage.getItem(nameStorage));
  } catch {
    throw new Error('Não foi possível consultar o Storage');
  }

  return getStorage || [];
}

export function getDate() {
  const dateObject = new Date();
  const obj = {
    date: dateObject.getDate(),
    month: dateObject.getMonth(),
    year: dateObject.getFullYear(),
    hour: dateObject.getHours(),
    minutes: dateObject.getMinutes(),
  }

  return obj;
}

export async function setNote(receivedTitleNote, receivedTextNote) {
  let isSetted = false;
  let newStorageNotes = [];
  const generateId = await nanoid();
  const storageNotes = getNewStorage('#_content-notes_#');

  if (receivedTitleNote.trim() == '' && receivedTextNote.trim() == '')
    return ({
      status: isSetted,
    });
  
  try {
    newStorageNotes.push(
      ...storageNotes || [],
      {
        id: generateId,
        titleNote: receivedTitleNote,
        textNote: receivedTextNote,
        date: getDate()
      }
    )
    localStorage.setItem('#_content-notes_#', JSON.stringify(newStorageNotes));
    isSetted = true;
  } catch {
    throw new Error('Não foi possível criar a anotação!');
  }

  return ({
    status: isSetted,
    noteId: generateId
  })
}

export function setChangeNote(receivedNoteId, receivedTitleNote, receivedTextNote) {
  let isChanged = false;
  let storageNotes = getNewStorage('#_content-notes_#');
  const currentPos = getPosInArray(storageNotes, receivedNoteId);

  if (receivedTitleNote.trim() == '' && receivedTextNote.trim() == '') {
    return setDeleteNote(receivedNoteId);
  }

  try {
    storageNotes[currentPos] = {
      id: receivedNoteId, 
      titleNote: receivedTitleNote,
      textNote: receivedTextNote,
      date: storageNotes[currentPos].date,
    }
    localStorage.setItem('#_content-notes_#', JSON.stringify(storageNotes));
    isChanged = true;
  } catch {
    throw new Error('Não foi possível alterar a anotação!');
  }

  return ({
    status: isChanged
  });
}

export function setDeleteNote(receivedNoteId) {
  let isDeleted = false;
  let storageNotes = getNewStorage('#_content-notes_#');
  const currentPos = getPosInArray(storageNotes, receivedNoteId);

  try {
    storageNotes.length ? storageNotes.splice(currentPos, 1) : storageNotes;
    localStorage.setItem('#_content-notes_#', JSON.stringify(storageNotes));

    isDeleted = true;
  } catch {
    throw new Error('Não foi possível deletar a anotação');
  }

  return ({
    status: isDeleted,
  });
}

export function setNoteItemMode(receivedMode) {
  localStorage.setItem('#_note-mode_#', receivedMode);
}