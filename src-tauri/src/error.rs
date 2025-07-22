use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Serialize, Debug, Deserialize)]
pub enum CommandError {
    #[error("Docker API error: {0}")]
    DockerError(String),
    #[error("Unexcpeted error: {0}")]
    UnexpectedError(String),
}
