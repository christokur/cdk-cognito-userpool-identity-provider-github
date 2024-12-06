#!/bin/bash

# Function to show usage
show_usage() {
    echo "Usage: $0 [--clean]"
    echo "  --clean    Clean the project before bootstrapping"
    echo "  Without --clean, only bootstrapping is performed"
    exit 1
}

# Function to check Node.js version
check_node_version() {
    if ! command -v node &> /dev/null; then
        echo "🔴 Node.js is not installed. Please install Node.js, Deno, or Bun and try again."
        exit 1
    fi
    NODE_VERSION=$(node -v | cut -d '.' -f 1 | cut -c 2-)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "🔴 Node.js version 18 or newer is required. You have version $NODE_VERSION."
        echo "Please install Node.js, Deno, or Bun and try again."
        exit 1
    else
        echo "🟢 You have version $NODE_VERSION."
    fi
}

# Main bootstrap logic
main() {
    # Check Node.js version
    check_node_version

    # Pass all arguments to the JS script
    "$(dirname "$0")/bootstrap-projen.js" "$@"
}

# Run main function with all arguments
main "$@"
