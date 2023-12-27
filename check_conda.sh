#!/bin/zsh

CONDA_ENV_NAME="tryDjango"

# 检查 conda 是否安装
if ! command -v conda &>/dev/null; then
	echo "Error: Conda is not installed."
	exit 1
fi

# 检查 tryDjango 环境是否存在
if conda env list | grep -q "$CONDA_ENV_NAME"; then
	echo "Conda environment '$CONDA_ENV_NAME' exists."

	# 在这里添加你想要执行的操作
	# 例如：激活环境并运行某个命令
	# conda activate "$CONDA_ENV_NAME"
	# Your additional commands go here

else
	echo "Conda environment '$CONDA_ENV_NAME' does not exist."
fi
