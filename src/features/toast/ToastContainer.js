import React, { useEffect, useReducer, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toastManager } from './toast';
import './toast.css';
const ADD = 'ADD';
const REMOVE = 'REMOVE';

const reducer = (state, action) => {
  const {
    type,
    data
  } = action;

  if (type === ADD) {
    if (state.filter(i => i.uniqueCode && i.uniqueCode === data.uniqueCode).length) {
      return state;
    }

    return [...state, data];
  } else if (type === REMOVE) {
    return state.filter(i => i.id !== data.id);
  }

  return state;
};

const ToastContainer = () => {
  const toastRootElementId = 'toast-wrapper';
  const [data, dispatch] = useReducer(reducer, []);
  const toastRef = useRef(null);

  const callback = (actionType, content, options) => {
    if (actionType === ADD) {
      dispatch({
        type: ADD,
        data: {
          content,
          ...options,
          key: `${options.id}`
        }
      });
    }

    if (options.pause && actionType === REMOVE) {
      dispatch({
        type: REMOVE,
        data: {
          id: options.id
        }
      });
    } else if (!options.pause) {
      window.setTimeout(() => {
        dispatch({
          type: REMOVE,
          data: {
            id: options.id
          }
        });
      }, options.timeout);
    }
  };

  useEffect(() => {
    toastManager.subscribe(callback);
  }, []);
  useEffect(() => {
    const node = document.createElement('div');
    node.setAttribute('id', toastRootElementId);
    document.body.appendChild(node);
    toastRef.current = node;
    return () => document.body.removeChild(node);
  }, []);

  const positionMaintainer = () => {
    const mapper = {};
    data.map(({
      position,
      ...rest
    }) => {
      if (position) {
        if (!mapper[position]) mapper[position] = [];
        mapper[position].push(rest);
      }
    });
    return mapper;
  };

  const markup = () => {
    const mapper = positionMaintainer();
    return Object.keys(mapper).map((position, index) => {
      const content = mapper[position].map(({
        key,
        content,
        variant,
        className
      }) => {
        let animationCssClass = 'toast-item-animation-top';
        if (position.indexOf('bottom')) animationCssClass = 'toast-item-animation-bottom';
        return /*#__PURE__*/React.createElement("div", {
          key: key,
          className: `toast-item toast-item-${variant} ${animationCssClass} ${className ? className : ''}`
        }, content);
      });
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: `toast-container ${position}`
      }, content);
    });
  };

  if (!toastRef.current) return null;
  return /*#__PURE__*/createPortal(markup(), toastRef.current);
};

export default ToastContainer;
