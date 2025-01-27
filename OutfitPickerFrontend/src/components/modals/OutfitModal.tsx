import React, { useState } from 'react'
import { ClothingItem } from '../../models/ClothingItem';
import SaveOutfitModal from './SaveOutfitModal';


interface OutfitModalProps {
    show: Boolean;
    onClose: () => void;
    selectedHat: ClothingItem | null;
    selectedTop: ClothingItem | null;
    selectedBottom: ClothingItem | null;
    selectedShoes: ClothingItem | null;
    onSaveSuccess: () => void;
  }

const OutfitModal: React.FC<OutfitModalProps> = ({ 
    show, onClose, selectedHat, selectedTop, selectedBottom, selectedShoes, onSaveSuccess}) => {

    const [showSaveOutfitModal, setShowSaveOutfitModal] = useState(false);

    const handleSaveOutfit = () => {
        setShowSaveOutfitModal(true);
    }

    const handleCloseBothModals = () => {
      setShowSaveOutfitModal(false);
      onSaveSuccess();
      onClose();
    }

    if (!show) return null;

    return (
      <>
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Selected Outfit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => onClose()}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                <img src = {selectedTop?.filePath}
                className="img-fluid rounded border me-3"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'fill',
                }}></img>
                  <strong>Top:</strong> {selectedTop && selectedTop.name}
                </p>
                <p>
                <img src = {selectedBottom?.filePath}
                className="img-fluid rounded border me-3"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'fill',
                }}></img>
                  <strong>Bottom:</strong> {selectedBottom && selectedBottom.name}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success me-auto"
                  onClick={handleSaveOutfit}
                >
                  Save New Outfit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onClose()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
         <SaveOutfitModal 
            show={showSaveOutfitModal} 
            onClose={() => setShowSaveOutfitModal(false)} 
            selectedHat={selectedHat}
            selectedTop={selectedTop}
            selectedBottom={selectedBottom}
            selectedShoes={selectedShoes}
            onSaveSuccess = {() => handleCloseBothModals()}
            ></SaveOutfitModal>
      </>
      )};

    

  export default OutfitModal;