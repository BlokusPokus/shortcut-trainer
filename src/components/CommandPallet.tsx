import React, { useState } from 'react'
import Modal from './common/modal'
const CommandPallet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
          <button onClick={() => setIsModalOpen(true)}>Change theme</button>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Example Modal">
            <p>This is the content of the modal.</p>
          </Modal>
    </div>
  )
}

export default CommandPallet