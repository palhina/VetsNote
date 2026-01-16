import { memo } from "react";
import styled from "styled-components";
import { Button, Input } from "../../components/ui";

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  onSearch: () => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isSearching: boolean;
  resultCount?: {
    cases: number;
    notes: number;
  };
}

const SearchWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SearchInput = styled(Input)`
  flex: 1;
  max-width: 400px;
`;

const ResultText = styled.p`
  margin-top: 12px;
  color: #666;
`;

const HelpText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #999;
`;

export const SearchBar = memo(
  ({
    query,
    onChange,
    onSearch,
    onClear,
    onKeyDown,
    isSearching,
    resultCount,
  }: SearchBarProps) => {
    return (
      <div>
        <SearchWrapper>
          <SearchInput
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="検索... (スペース=AND, カンマ=OR)"
          />
          <Button variant="secondary" onClick={onSearch}>
            検索
          </Button>
          {isSearching && (
            <Button variant="ghost" onClick={onClear}>
              クリア
            </Button>
          )}
        </SearchWrapper>

        {isSearching && resultCount && (
          <ResultText>
            検索結果: 症例 {resultCount.cases}件、セミナー {resultCount.notes}件
          </ResultText>
        )}

        {!isSearching && (
          <HelpText>
            例: 「犬 骨折」= 両方含む / 「犬,猫」= どちらか含む
          </HelpText>
        )}
      </div>
    );
  }
);
