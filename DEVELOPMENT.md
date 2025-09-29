# Alarmo Development Guide

This document will help you set up your local development environment and get started with contributing to the project. 
Contributions are much appreciated, but before starting on implementation of a new feature you are advised to create an issue for discussing your plans.

- [Alarmo Development Guide](#alarmo-development-guide)
  - [📦 Requirements](#-requirements)
  - [🧪 Setting Up the Development Environment with uv](#-setting-up-the-development-environment-with-uv)
    - [🔧 Installation](#-installation-one-time-setup)
    - [📦 Setup Python Environment](#-setup-python-environment)
    - [Update VSCode Settings](#update-vscode-settings)
    - [Running Scripts](#running-scripts)
    - [Testing Your Changes](#testing-your-changes)
    - [Managing Python Versions](#managing-python-versions)
  - [❓ FAQ](#-faq)
    - [Bypassing pre-commit hooks](#bypassing-pre-commit-hooks)

## 📦 Requirements

Before you begin, please ensure you have the following tools installed on your system:

- Python 3.x (Latest stable version recommended)
- Git (Latest version)
- Visual Studio Code (Recommended editor)
- Terminal/Command Prompt access

---

## 🧪 Setting Up the Development Environment with `uv`

We use [`uv`](https://github.com/astral-sh/uv), a modern Python package manager that's significantly faster than pip and provides better dependency resolution.

### 🔧 Installation (one-time setup)

1. First, install `uv` by following the [official installation guide](https://docs.astral.sh/uv/getting-started/installation/)

2. Fork the repository:
   - Visit https://github.com/nielsfaber/alarmo
   - Click the "Fork" button in the top right
   - Wait for GitHub to create your fork

3. Clone your fork:
   ```bash
   git clone https://github.com/[your-username]/alarmo.git
   cd alarmo
   ```

### 📦 Setup Python Environment

Running the following commands will:
- Create a new virtual environment in `.venv`
- Install all project dependencies from `uv.lock`
- Set up pre-commit hooks for code quality checks

```bash
# Install dependencies and create virtual environment
uv sync

# Install pre-commit hooks
uv run pre-commit install
```

### Update VSCode Settings

To ensure VSCode uses the correct Python environment:

1. Open the Command Palette (Ctrl/Cmd + Shift + P)
2. Type and select `Python: Select Interpreter`
3. Choose the interpreter at `./.venv/bin/python`

This will configure debugging, linting, and other Python features to use your project's environment.

### Running Scripts

One of the benefits of `uv` is that you don't need to manually activate the virtual environment. Here are some common commands:

```bash
# Run a Python script
uv run python ./script.py

# Run tests
uv run pytest tests

# Add a new dependency
uv add package_name

# Update dependencies
uv sync --upgrade
```

### Testing Your Changes

Testing is crucial for maintaining code quality. Before submitting changes:

1. Pre-commit hooks will automatically run tests when you commit
2. Review the [Test Documentation](./tests/README.md) for writing new tests

### Managing Python Versions

Alarmo uses a file to manage Python versions:

- `pyproject.toml`: Defines the compatible Python versions for the project

When updating Python versions:
1. Update `pyproject.toml` with your target version
2. Test thoroughly with the new version

---

## ❓ FAQ

### Bypassing pre-commit hooks

While we recommend fixing issues identified by pre-commit, there may be situations where you need to bypass the hooks temporarily:
- During emergency hotfixes
- When committing work-in-progress changes
- When making documentation-only changes

You can bypass pre-commit hooks for a single commit using either:
```bash
# Long form
git commit -m "your message" --no-verify

# Short form
git commit -m "your message" -n
```

**Important:** After bypassing hooks:
1. This should be used sparingly
2. Run checks manually before pushing:
   ```bash
   uv run pre-commit run --all-files
   ```
3. Document the reason for bypassing in your commit message
