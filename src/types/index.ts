export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  thinking?: ThinkingStep[];
  toolCalls?: ToolCall[];
  artifactId?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface ThinkingStep {
  id: string;
  step: string;
  timestamp: Date;
  index: number;
}

export interface ToolCall {
  id: string;
  tool: string;
  query: string;
  result?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
  preview?: string;
}

export interface Artifact {
  id: string;
  type: 'code' | 'document' | 'chart';
  title: string;
  content: string;
  language?: string;
  createdAt: Date;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
  connectors: ConnectorType[];
}

export type ConnectorType = 'web_search' | 'research' | 'style' | 'model';

export interface ConnectorConfig {
  apiKey?: string;
  endpoint?: string;
  maxResults?: number;
  temperature?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface Connector {
  type: ConnectorType;
  enabled: boolean;
  config?: ConnectorConfig; 
}

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
  costPer1M: number;
}


export type StreamEvent =
  | {
      type: 'message_start';
      data: {
        messageId: string;
        timestamp: number;
      };
    }
  | {
      type: 'content_delta';
      data: {
        delta: string;
        messageId: string;
      };
    }
  | {
      type: 'thinking_step';
      data: {
        step: string;
        index: number;
      };
    }
  | {
      type: 'tool_call';
      data: {
        tool: string;
        query: string;
      };
    }
  | {
      type: 'artifact_created';
      data: {
        artifactId: string;
        artifactType: 'code' | 'document' | 'chart';
        content: string;
      };
    }
  | {
      type: 'message_end';
      data: {
        messageId: string;
        finishReason: 'complete' | 'stop' | 'error';
      };
    };