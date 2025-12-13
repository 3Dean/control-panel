import { useState } from 'react';
import Screen from './Screen';
import Knob from './Knob';
import ToggleSwitch from './ToggleSwitch';
import Modal from './Modal';


interface ControlsConfig {
  [key: string]: {
    title: string;
    type: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    placeholder?: string;
  };
}

const controlsConfig: ControlsConfig = {
  rebalance: { title: 'Rebalancing Interval', type: 'range', min: 1, max: 30, step: 1, unit: 'days' },
  sector: { title: 'Sector Weighting', type: 'textarea', placeholder: 'e.g. Tech 30%, Energy 15%, Financials 20%' },
  ai: { title: 'AI Confidence', type: 'range', min: 0, max: 100, step: 1, unit: '%' },
  takeProfit: { title: 'Take Profit', type: 'number', min: 1, max: 100, step: 0.5, unit: '%' },
  paramC: { title: 'Parameter C', type: 'text', placeholder: 'Describe Parameter C' },
  paramF: { title: 'Parameter F', type: 'text', placeholder: 'Describe Parameter F' }
};

interface Values {
  [key: string]: string | number;
}

const ControlPanel = () => {
  const [mode, setMode] = useState<'bull' | 'bear'>('bull');
  const [amount] = useState(1000);
  const [values, setValues] = useState<Values>({
    rebalance: 7,
    sector: 'Even-weighted portfolio',
    ai: 72,
    takeProfit: 15,
    paramC: 'Medium',
    paramF: 'Standard'
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeControl, setActiveControl] = useState<string | null>(null);

  const handleToggle = () => {
    setMode(prevMode => (prevMode === 'bull' ? 'bear' : 'bull'));
  };

  const handleKnobClick = (control: string) => {
    setActiveControl(control);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setActiveControl(null);
  };

  const handleModalSave = (newValue: FormDataEntryValue | null) => {
    if (activeControl && newValue !== null) {
      setValues(prevValues => ({
        ...prevValues,
        [activeControl]: newValue as string | number
      }));
    }
    handleModalClose();
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  };

  return (
    <div className="panel">
      <div className="ui-container">
        <Screen amount={formatCurrency(amount)} />
        <div className="control-grid">
          <div className="knob-group knob-group--left">
            <Knob label="Rebalancing Interval" control="rebalance" onClick={() => handleKnobClick('rebalance')} />
            <Knob label="AI Confidence" control="ai" onClick={() => handleKnobClick('ai')} />
            <Knob label="Parameter C" control="paramC" onClick={() => handleKnobClick('paramC')} />
          </div>
          <ToggleSwitch mode={mode} onToggle={handleToggle} />
          <div className="knob-group knob-group--right">
            <Knob label="Sector Weighting" control="sector" onClick={() => handleKnobClick('sector')} />
            <Knob label="Take Profit" control="takeProfit" onClick={() => handleKnobClick('takeProfit')} />
            <Knob label="Parameter F" control="paramF" onClick={() => handleKnobClick('paramF')} />
          </div>
        </div>
      </div>
      <Modal title={activeControl ? controlsConfig[activeControl].title : ''} show={modalOpen} onClose={handleModalClose}>
        {activeControl && (
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newValue = formData.get('control');
            handleModalSave(newValue);
          }}>
            {controlsConfig[activeControl].type === 'range' && (
              <div className="field">
                <label htmlFor="control-input">{controlsConfig[activeControl].title}</label>
                <input
                  type="range"
                  id="control-input"
                  name="control"
                  min={controlsConfig[activeControl].min}
                  max={controlsConfig[activeControl].max}
                  step={controlsConfig[activeControl].step}
                  defaultValue={values[activeControl]}
                />
                <div className="range-value">{values[activeControl]}{controlsConfig[activeControl].unit || ''}</div>
              </div>
            )}
            {controlsConfig[activeControl].type === 'number' && (
              <div className="field">
                <label htmlFor="control-input">{controlsConfig[activeControl].title}</label>
                <input
                  type="number"
                  id="control-input"
                  name="control"
                  min={controlsConfig[activeControl].min}
                  max={controlsConfig[activeControl].max}
                  step={controlsConfig[activeControl].step}
                  defaultValue={values[activeControl]}
                />
              </div>
            )}
            {controlsConfig[activeControl].type === 'textarea' && (
              <div className="field">
                <label htmlFor="control-input">{controlsConfig[activeControl].title}</label>
                <textarea
                  id="control-input"
                  name="control"
                  rows={4}
                  placeholder={controlsConfig[activeControl].placeholder || ''}
                  defaultValue={values[activeControl]}
                />
              </div>
            )}
            {controlsConfig[activeControl].type === 'text' && (
              <div className="field">
                <label htmlFor="control-input">{controlsConfig[activeControl].title}</label>
                <input
                  type="text"
                  id="control-input"
                  name="control"
                  placeholder={controlsConfig[activeControl].placeholder || ''}
                  defaultValue={values[activeControl]}
                />
              </div>
            )}
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={handleModalClose}>Cancel</button>
              <button type="submit" className="btn-primary">Save</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ControlPanel;
