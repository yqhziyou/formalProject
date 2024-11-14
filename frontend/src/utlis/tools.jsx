import React, { useState, useEffect } from 'react';

export function Tools({ totalTokenUsage }) {
    const [tokenUsage, setTokenUsage] = useState(totalTokenUsage);

    useEffect(() => {
        // 更新 tokenUsage 为最新的 totalTokenUsage
        setTokenUsage(totalTokenUsage);
    }, [totalTokenUsage]); // 依赖 totalTokenUsage 的变化

    return (
        <div>
            <p>Token Usage: {tokenUsage}</p>
        </div>
    );
}