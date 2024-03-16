import { useState, useEffect } from 'preact/hooks'

export default function Modal(props: {
  viewModal: bool
  setModalView: () => void
  buttonText: string
  child: object
}) {
  return (
    <div>
      {props.viewModal ? (
        <div className="w-fit h-fit fixed top-1/2 left-1/4 bg-slate-800 z-0 p-8 rounded-lg">
          {props.child}
          <button onClick={() => props.setModalView()}>
            {props.buttonText}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
