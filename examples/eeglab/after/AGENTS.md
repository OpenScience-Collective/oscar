# EEGLAB: notes for agents

## What this is
EEGLAB is an open-source MATLAB toolbox (Swartz Center for Computational Neuroscience, UC San Diego)
for analyzing EEG, MEG, and other electrophysiological data.
It has a graphical interface and a scripting interface; all data lives in the EEG structure,
stored on disk as `.set` (metadata) plus `.fdt` (data).

## Run it without the graphical interface
Start MATLAB, add EEGLAB to the path, and run `eeglab nogui`, then script with the `pop_` functions.

## The functions that matter
A machine-readable catalog is in [`function-manifest.json`](function-manifest.json).
A common continuous-data pipeline:

    EEG = pop_loadset('filename', 'sub-01_eeg.set', 'filepath', '.');
    EEG = pop_eegfiltnew(EEG, 'locutoff', 1);       % high-pass at 1 Hz
    EEG = pop_runica(EEG, 'icatype', 'runica');     % independent component analysis
    EEG = eeg_checkset(EEG);                        % validate/repair the structure
    pop_saveset(EEG, 'filename', 'sub-01_clean.set', 'filepath', '.');

## Conventions and gotchas
- Always run `eeg_checkset(EEG)` after modifying a dataset.
- Sampling rate is `EEG.srate`; events are in `EEG.event`; channel locations in `EEG.chanlocs`.
- Many operations have both a `pop_` form (interactive) and a lower-level form (scriptable).

## Links
- Home and tutorials: https://eeglab.org
- Source: https://github.com/sccn/eeglab
- BIDS import and export: the `bids-matlab-tools` plugin
