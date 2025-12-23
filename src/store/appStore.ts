import { create } from 'zustand';
import { Conversation, Connector, ModelConfig, Artifact } from '@/types';
import { mockModels } from '@/lib/mock-data';

// Style configuration interface
interface StyleConfig {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
}

interface AppState {
  // UI State
  sidebarCollapsed: boolean;
  artifactsPanelOpen: boolean;
  activeConversationId: string | null;
  
  // Data State
  conversations: Conversation[];
  activeConnectors: Connector[];
  selectedModel: ModelConfig;
  artifacts: Artifact[];
  
  // Style Configuration State
  selectedStyle: string;
  styleConfig: StyleConfig;
  
  // UI Actions
  toggleSidebar: () => void;
  toggleArtifactsPanel: () => void;
  setActiveConversation: (id: string | null) => void;
  
  // Conversation Actions
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  
  // Connector Actions
  toggleConnector: (type: string) => void;
  
  // Model Actions
  setModel: (model: ModelConfig) => void;
  
  // Artifact Actions
  addArtifact: (artifact: Artifact) => void;
  removeArtifact: (id: string) => void;
  
  // Style Actions
  setSelectedStyle: (style: string) => void;
  setStyleConfig: (config: StyleConfig) => void;
  updateStyleFromSelection: (styleName: string) => void;
}

// Predefined style configurations
const styleConfigurations: Record<string, StyleConfig> = {
  Normal: {
    systemPrompt: 'Respond naturally and conversationally with balanced detail.',
    temperature: 0.7,
    maxTokens: 2000,
  },
  Concise: {
    systemPrompt: 'Be extremely brief and to the point. Use short sentences. Avoid unnecessary elaboration.',
    temperature: 0.5,
    maxTokens: 1000,
  },
  Explanatory: {
    systemPrompt: 'Provide detailed explanations with examples, context, and thorough reasoning. Break down complex concepts.',
    temperature: 0.8,
    maxTokens: 3000,
  },
  Formal: {
    systemPrompt: 'Use formal language and professional tone. Avoid contractions. Maintain business-appropriate communication.',
    temperature: 0.6,
    maxTokens: 2000,
  },
};

export const useAppStore = create<AppState>((set) => ({
  // ==================== Initial State ====================
  
  // UI State
  sidebarCollapsed: false,
  artifactsPanelOpen: false,
  activeConversationId: null,
  
  // Data State
  conversations: [],
  activeConnectors: [
    { type: 'web_search', enabled: false },
    { type: 'research', enabled: false },
    { type: 'style', enabled: false },
    { type: 'model', enabled: true },
  ],
  selectedModel: mockModels[0], // Mistral Large 3 as default
  artifacts: [],
  
  // Style State
  selectedStyle: 'Normal',
  styleConfig: styleConfigurations.Normal,

  // ==================== UI Actions ====================
  
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
  
  toggleArtifactsPanel: () => set((state) => ({ 
    artifactsPanelOpen: !state.artifactsPanelOpen 
  })),
  
  setActiveConversation: (id) => set({ 
    activeConversationId: id 
  }),
  
  // ==================== Conversation Actions ====================
  
  addConversation: (conversation) => set((state) => ({
    conversations: [conversation, ...state.conversations],
  })),
  
  updateConversation: (id, updates) => set((state) => ({
    conversations: state.conversations.map((conv) =>
      conv.id === id ? { ...conv, ...updates, updatedAt: new Date() } : conv
    ),
  })),
  
  deleteConversation: (id) => set((state) => ({
    conversations: state.conversations.filter((conv) => conv.id !== id),
    activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
  })),
  
  // ==================== Connector Actions ====================
  
  toggleConnector: (type) => set((state) => ({
    activeConnectors: state.activeConnectors.map((conn) =>
      conn.type === type ? { ...conn, enabled: !conn.enabled } : conn
    ),
  })),
  
  // ==================== Model Actions ====================
  
  setModel: (model) => set({ 
    selectedModel: model 
  }),
  
  // ==================== Artifact Actions ====================
  
  addArtifact: (artifact) => set((state) => ({
    artifacts: [...state.artifacts, artifact],
    artifactsPanelOpen: true,
  })),
  
  removeArtifact: (id) => set((state) => ({
    artifacts: state.artifacts.filter((art) => art.id !== id),
  })),
  
  // ==================== Style Actions ====================
  
  setSelectedStyle: (style) => set({ 
    selectedStyle: style 
  }),
  
  setStyleConfig: (config) => set({ 
    styleConfig: config 
  }),
  
  /**
   * Updates both the selected style and applies the corresponding configuration
   * This is the main method to use when changing styles
   */
  updateStyleFromSelection: (styleName) => {
    const config = styleConfigurations[styleName];
    if (config) {
      set({
        selectedStyle: styleName,
        styleConfig: config,
      });
    } else {
      console.warn(`Style "${styleName}" not found. Available styles:`, Object.keys(styleConfigurations));
    }
  },
}));

// ==================== Selectors (for optimized access) ====================

/**
 * Get the current style configuration for API calls
 */
export const getStyleConfig = () => useAppStore.getState().styleConfig;

/**
 * Get the currently selected model
 */
export const getSelectedModel = () => useAppStore.getState().selectedModel;

/**
 * Get all enabled connectors
 */
export const getEnabledConnectors = () => {
  const connectors = useAppStore.getState().activeConnectors;
  return connectors.filter(conn => conn.enabled);
};

/**
 * Check if a specific connector is enabled
 */
export const isConnectorEnabled = (type: string) => {
  const connectors = useAppStore.getState().activeConnectors;
  const connector = connectors.find(conn => conn.type === type);
  return connector?.enabled || false;
};

/**
 * Get the complete request configuration for API calls
 */
export const getRequestConfig = () => {
  const state = useAppStore.getState();
  return {
    model: state.selectedModel.id,
    style: state.selectedStyle,
    styleConfig: state.styleConfig,
    enabledConnectors: getEnabledConnectors().map(c => c.type),
  };
};