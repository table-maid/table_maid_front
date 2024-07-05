import { css } from "@emotion/react";

export const menuModal = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 700px;
    max-width: 90%;
    height: auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        
    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 15px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        
        &:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
        }

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        svg {
            margin-right: 5px;
        }
    }
`;

export const modalHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;

    h2 {
        margin: 0;
        font-size: 20px;
    }

    .closeButton {
        color: black;
        cursor: pointer;
        font-size: 20px;
        background: none;
        border: none;

        &:hover {
            color: #fff;
        }
    }
    
`;

export const modalContent = css`
    margin-top: 20px;

    div {
        margin-bottom: 15px;
    }

    label {
        display: block;
        font-size: 14px;
        margin-bottom: 5px;
    }

    input[type="text"], select {
        width: calc(100% - 20px);
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        padding: 10px 15px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;

        &:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
        }

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        &:not(:first-of-type) {
            margin-left: 10px;
        }
    }

    .checkboxContainer {
        display: flex;
        align-items: center;
        gap: 10px;

        input[type="checkbox"] {
            width: 20px;
            height: 20px;
        }
    }
`;

export const modalFooter = css`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    button {
        padding: 10px 15px;
        font-size: 16px;
        font-weight: bold;
        color: #fff;
        background-color: #007bff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
        
        &:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.5);
        }

        &:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        &:first-of-type {
            background-color: #28a745;

            &:hover {
                background-color: #218838;
            }
        }

        &:last-of-type {
            background-color: #6c757d;
            
            &:hover {
                background-color: #5a6268;
            }
        }

        &:not(:first-of-type) {
            margin-left: 10px;
        }
    }
`;

export const selectWrapper = css`
  position: relative;
  align-items: center;

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    background-position: right 20px center;
    background-size: 10px 10px;
  }

  .select-arrow {
    position: absolute;
    top: 34px;
    right: 30px;
    pointer-events: none;
    font-size: 16px;
    color: #555;
  }

  select::-ms-expand {
    display: none;
  }
`;