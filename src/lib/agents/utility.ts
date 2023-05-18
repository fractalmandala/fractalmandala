	type Message = {
    role: 'user' | 'assistant' | 'system';
    content: string;
	};

	type ChatHistory = Message[];

	function loadChatHistory(): ChatHistory {
    const chatHistoryString = localStorage.getItem('chatHistory');
    return chatHistoryString ? JSON.parse(chatHistoryString) : [];
	}

