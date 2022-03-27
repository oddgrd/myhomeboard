export const whitelistUserMutation = `
  mutation WhitelistUser($options: WhitelistInput!) {
    whitelistUser(options: $options) {
      errors {
        field
        message
      }
      userId
    }
  }
`;

export const removeFromWhitelistMutation = `
  mutation RemoveFromWhitelist($options: WhitelistInput!) {
    removeFromWhitelist(options: $options) {
      errors {
        field
        message
      }
      userId
    }
  }
`;

export const createBoardMutation = `
  mutation CreateBoard($options: BoardInput!) {
    createBoard(options: $options) {
      board {
        id
        title
      }
      errors {
        message
        field
      }
    }
  }
`;

export const editBoardMutation = `
  mutation EditBoard($options: EditBoardInput!) {
    editBoard(options: $options) {
      board {
        id
        title
        angles
        adjustable
      }
      errors {
        message
        field
      }
    }
  }
`;

export const deleteBoardMutation = `
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const addAscentMutation = `
mutation AddAscent($options: AddAscentInput!) {
  addAscent(options: $options)
}
`;

export const editAscentMutation = `
mutation EditAscent($options: EditAscentInput!) {
  editAscent(options: $options)
}

`;

export const deleteAscentMutation = `
mutation DeleteAscent($problemId: String!) {
  deleteAscent(problemId: $problemId)
}
`;

export const createProblemMutation = `
  mutation CreateProblem($options: CreateProblemInput!) {
    createProblem(options: $options) {
      problem {
        title
        rules
        id
        layoutId
        boardId
        grade
        angle
        coordinates {
          x
          y
          color
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const editProblemMutation = `
  mutation EditProblem($options: EditProblemInput!) {
    editProblem(options: $options) {
      problem {
        id
        title
        grade
        angle
        rules
      }
      errors {
        field
        message
      }
    }
  }
`;

export const deleteProblemMutation = `
  mutation DeleteProblem($id: String!) {
    deleteProblem(id: $id)
  }
`;