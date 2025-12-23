import { Conversation, Template, ModelConfig } from '@/types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Building Enterprise AI Platform',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    messageCount: 15,
    preview: 'Discussed architecture and AWS deployment strategies...',
  },
  {
    id: '2',
    title: 'ML Model Optimization',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    messageCount: 8,
    preview: 'Exploring hyperparameter tuning techniques...',
  },
  {
    id: '3',
    title: 'Data Pipeline Design',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messageCount: 23,
    preview: 'Created ETL pipeline for real-time processing...',
  },
];

export const mockTemplates: Template[] = [
  {
    id: 'tpl-1',
    name: 'Code Assistant',
    description: 'Help with coding tasks, debugging, and architecture',
    icon: '💻',
    prompt: 'You are an expert software engineer...',
    connectors: ['web_search', 'model'],
  },
  {
    id: 'tpl-2',
    name: 'Research Agent',
    description: 'Deep research with citations and analysis',
    icon: '🔬',
    prompt: 'You are a thorough research assistant...',
    connectors: ['web_search', 'research'],
  },
  {
    id: 'tpl-3',
    name: 'Data Analyst',
    description: 'Analyze data, create visualizations, and insights',
    icon: '📊',
    prompt: 'You are a data analysis expert...',
    connectors: ['model'],
  },
  {
    id: 'tpl-4',
    name: 'Content Writer',
    description: 'Create engaging content with custom styles',
    icon: '✍️',
    prompt: 'You are a professional content writer...',
    connectors: ['style', 'web_search'],
  },
];

export const mockModels: ModelConfig[] = [
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral AI',
    maxTokens: 128000,
    costPer1M: 8.0,
  },
  {
    id: 'qwen-3',
    name: 'Qwen 3',
    provider: 'Alibaba Cloud',
    maxTokens: 32000,
    costPer1M: 5.0,
  },
  {
    id: 'gpt-4',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    maxTokens: 128000,
    costPer1M: 10.0,
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    maxTokens: 200000,
    costPer1M: 15.0,
  },
  {
    id: 'gemini',
    name: 'Gemini Pro',
    provider: 'Google',
    maxTokens: 32000,
    costPer1M: 7.0,
  },
];

export const mockStreamingResponse = `As an enterprise AI platform architect, I'll help you design a scalable solution. Let me break this down into key components:

**1. Infrastructure Layer**
- AWS EKS for container orchestration
- Auto-scaling groups for dynamic load handling
- Multi-region deployment for high availability

**2. Security & Compliance**
- End-to-end encryption
- SOC 2 and GDPR compliance
- Role-based access control (RBAC)

**3. AI/ML Layer**
- Model serving with SageMaker
- A/B testing framework
- Performance monitoring

Would you like me to dive deeper into any specific component?`;

export const mockThinkingSteps = [
  'Analyzing the requirements...',
  'Searching knowledge base for best practices...',
  'Considering AWS services and architecture patterns...',
  'Planning the response structure...',
  'Generating comprehensive answer...',
];

export const mockCodeArtifact = `# Enterprise AI Platform Architecture

## AWS Infrastructure

\`\`\`python
import boto3
from typing import Dict, List

class AgenticAIPlatform:
    def __init__(self):
        self.eks_client = boto3.client('eks')
        self.sagemaker_client = boto3.client('sagemaker')
        
    def deploy_model(self, model_name: str, instance_type: str):
        """Deploy ML model to SageMaker endpoint"""
        response = self.sagemaker_client.create_model(
            ModelName=model_name,
            PrimaryContainer={
                'Image': 'your-ecr-image',
                'ModelDataUrl': 's3://your-bucket/model.tar.gz'
            },
            ExecutionRoleArn='arn:aws:iam::xxx:role/SageMakerRole'
        )
        return response
        
    def create_endpoint(self, endpoint_name: str, model_name: str):
        """Create inference endpoint"""
        config_name = f"{endpoint_name}-config"
        
        # Create endpoint configuration
        self.sagemaker_client.create_endpoint_config(
            EndpointConfigName=config_name,
            ProductionVariants=[{
                'VariantName': 'AllTraffic',
                'ModelName': model_name,
                'InstanceType': 'ml.m5.xlarge',
                'InitialInstanceCount': 1
            }]
        )
        
        # Create endpoint
        response = self.sagemaker_client.create_endpoint(
            EndpointName=endpoint_name,
            EndpointConfigName=config_name
        )
        
        return response

# Usage
platform = AgenticAIPlatform()
platform.deploy_model('enterprise-llm-v1', 'ml.m5.xlarge')
platform.create_endpoint('prod-endpoint', 'enterprise-llm-v1')
\`\`\`

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────┐
│           Load Balancer (ALB)               │
└──────────────┬──────────────────────────────┘
               │
       ┌───────┴───────┐
       │   EKS Cluster │
       │  (API Layer)  │
       └───────┬───────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐         ┌──────▼─────┐
│SageMaker│         │  DynamoDB  │
│Endpoints│         │   (State)  │
└────────┘         └────────────┘
\`\`\`
`;