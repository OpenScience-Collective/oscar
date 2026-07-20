# HEDit: notes for agents

## What this is
HEDit turns a natural-language or image description of an experimental event
into a valid HED (Hierarchical Event Descriptor) annotation, using a multi-agent system.
It is a Python package and command-line tool, part of the Annotation Garden.

## Install and configure
```
pip install hedit
hedit init --api-key <OpenRouter key>   # get a key at https://openrouter.ai
```

## The commands that matter
```
hedit annotate "participant pressed the left button" -o json   # natural language -> HED, JSON output
hedit annotate-image stimulus.png -o json                      # image -> HED
hedit validate "Sensory-event, Visual-presentation"            # check a HED string
hedit health                                                   # API status
hedit config show                                              # show configuration
```

## For agents
- Use `-o json` for machine-readable output.
- `hedit annotate` produces a HED string; validate it (`hedit validate`, or the HED tools) before you rely on it.
- HEDit requires an OpenRouter API key, set once with `hedit init`.

## Links
- Package: https://pypi.org/project/hedit/
- Source: https://github.com/Annotation-Garden/HEDit
- Annotation Garden: https://annotation.garden
- HED (the standard it targets): https://www.hedtags.org
