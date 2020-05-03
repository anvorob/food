import React from 'react';
import './loading.css';

export default function Loading(){
    return (
        <div style={{height: "100%" }}>
            <div class="progress container">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}