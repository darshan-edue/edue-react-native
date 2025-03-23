import React from 'react';
import { ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ScrollView className="flex-1 px-14">
      <Markdown
        style={{
          body: {
            fontSize: 16,
            lineHeight: 24,
            color: '#1a1a1a',
          },
          heading1: {
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 24,
            marginBottom: 16,
          },
          heading2: {
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 12,
          },
          heading3: {
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 16,
            marginBottom: 8,
          },
          paragraph: {
            marginBottom: 12,
          },
          list: {
            marginBottom: 12,
          },
          listItem: {
            marginBottom: 4,
          },
          code: {
            backgroundColor: '#f5f5f5',
            padding: 4,
            borderRadius: 4,
            fontFamily: 'monospace',
          },
          code_inline: {
            backgroundColor: '#f5f5f5',
            padding: 2,
            borderRadius: 4,
            fontFamily: 'monospace',
          },
        }}
      >
        {content}
      </Markdown>
    </ScrollView>
  );
} 