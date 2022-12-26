import { ref, watch } from "vue";

export function useChangeObserver(lastSavedTitle, lastSavedText, titleNote, textNote) {
    const isNoteChanged = ref(false);
    
    watch(() => [titleNote, textNote], ([titleNote, textNote]) => {

        if(titleNote.value.trim() == "" && textNote.value.trim() == "") 
            return isNoteChanged.value = false;

        if(titleNote.value != lastSavedTitle.value || textNote.value != lastSavedText.value){
            return isNoteChanged.value = true;
        }
        
        return isNoteChanged.value = false;
    }, {deep: true});
    
    return { isNoteChanged };
}