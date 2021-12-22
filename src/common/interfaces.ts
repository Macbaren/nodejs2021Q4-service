export interface IUserReqBody {
  name: string;
  login: string;
  password: string;
}

export interface IUserResBody {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IUserReqParam {
  userId: string;
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoardReqBody {
  title: string;
  columns: IColumn[];
}

export interface IBoardResBody {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface IBoardReqParam {
  boardId: string;
}

export interface ITaskReqBody {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface ITaskResBody {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface ITaskReqParam {
  boardId: string;
  taskId: string;
}
