import { nanoid } from '@/lib/helpers';
import { createAI, getAIState } from 'ai/rsc';

export const AI = createAI<any[], React.ReactNode[]>({
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
  actions: {
    //   submitUserMessage,
  },
  unstable_onGetUIState: async () => {
    'use server';

    const aiState = getAIState();

    //   if (aiState) {
    //     const uiState = getUIStateFromAIState(aiState);
    //     return uiState;
    //   } else return;
  },
});
